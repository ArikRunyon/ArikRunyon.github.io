import Head from 'next/head'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import IngredientList from '@/components/IngredientList'

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <>
      <Head>
        <title>Health App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-light-green-200">
        {!session ? (
          <div className="min-w-full min-h-screen flex items-center justify-center">
            <div className="flex justify-center items-center p-4">
              <div className="sm:h-auto sm:w-2/5 max-w-sm p-5 bg-white shadow flex flex-col text-base">
                <span className="font-sans text-4xl text-center pb-2 mb-1 border-b mx-4 align-center">
                  Login
                </span>
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
              </div>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col justify-center items-center p-4"
            style={{ minWidth: 250, margin: 'auto' }}
          >
            <IngredientList session={session} />
            <button
              className="btn-black mt-12"
              onClick={async () => {
                const { error } = await supabase.auth.signOut()
                if (error) console.log('Error logging out:', error.message)
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  )
}
