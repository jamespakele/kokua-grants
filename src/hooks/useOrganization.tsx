import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import type { Organization } from '../types'

export function useOrganization() {
  const { user } = useAuth()
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchOrganization()
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchOrganization = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('user_id', user?.id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // No organization found - this is expected for new users
          setOrganization(null)
        } else {
          throw error
        }
      } else {
        setOrganization(data)
      }
    } catch (err) {
      console.error('Error fetching organization:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch organization')
    } finally {
      setLoading(false)
    }
  }

  const createOrganization = async (orgData: Omit<Organization, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    try {
      setError(null)

      const { data, error } = await supabase
        .from('organizations')
        .insert({
          ...orgData,
          user_id: user?.id
        })
        .select()
        .single()

      if (error) throw error

      setOrganization(data)
      return data
    } catch (err) {
      console.error('Error creating organization:', err)
      setError(err instanceof Error ? err.message : 'Failed to create organization')
      throw err
    }
  }

  const updateOrganization = async (updates: Partial<Omit<Organization, 'id' | 'created_at' | 'updated_at' | 'user_id'>>) => {
    try {
      setError(null)

      if (!organization) throw new Error('No organization to update')

      const { data, error } = await supabase
        .from('organizations')
        .update(updates)
        .eq('id', organization.id)
        .select()
        .single()

      if (error) throw error

      setOrganization(data)
      return data
    } catch (err) {
      console.error('Error updating organization:', err)
      setError(err instanceof Error ? err.message : 'Failed to update organization')
      throw err
    }
  }

  return {
    organization,
    loading,
    error,
    createOrganization,
    updateOrganization,
    refetch: fetchOrganization,
    needsOnboarding: !loading && !organization
  }
}