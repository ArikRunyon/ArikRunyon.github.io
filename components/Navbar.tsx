import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Navbar({ session }: { session: Session }) {

    const user = session.user
    const supabase = useSupabaseClient()

    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
                <button
                    className="btn-black">View Ingredients</button>
                <button
                    className="btn-black">Add Ingredient</button>
                <button
                    className="btn-black">View Recipes</button>
                <button
                    className="btn-black">Add Recipe</button>
                <button
                    className="btn-black">View Products</button>
                <button
                    className="btn-black">Add Products</button>
            </div>
            <button
                className="btn-black"
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