"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

type SupabaseContext = {
  supabase: SupabaseClient | null
  isInitialized: boolean
}

const Context = createContext<SupabaseContext>({
  supabase: null,
  isInitialized: false,
})

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseAnonKey) {
      const client = createClient(supabaseUrl, supabaseAnonKey)
      setSupabase(client)
    }

    setIsInitialized(true)
  }, [])

  return <Context.Provider value={{ supabase, isInitialized }}>{children}</Context.Provider>
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider")
  }
  return context
}
