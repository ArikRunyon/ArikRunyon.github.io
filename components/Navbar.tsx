import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Navbar({ session }: { session: Session }) {

    const user = session.user
    const supabase = useSupabaseClient()

    return (
        <div>
            <div>
                <button>View Ingredients</button>
                <button>Add Ingredient</button>
                <button>View Recipes</button>
                <button>Add Recipe</button>
                <button>View Products</button>
                <button>Add Products</button>
            </div>
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
    )

}