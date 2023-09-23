import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Navbar({ session }: { session: Session }) {

    const user = session.user
    const supabase = useSupabaseClient()

    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <div>
                <button
                    className="btn-black mt-12">View Ingredients</button>
                <button
                    className="btn-black mt-12">Add Ingredient</button>
                <button
                    className="btn-black mt-12">View Recipes</button>
                <button
                    className="btn-black mt-12">Add Recipe</button>
                <button
                    className="btn-black mt-12">View Products</button>
                <button
                    className="btn-black mt-12">Add Products</button>
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