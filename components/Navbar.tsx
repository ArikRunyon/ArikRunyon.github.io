import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Navbar({ session }: { session: Session }) {

    const user = session.user
    const supabase = useSupabaseClient()

    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#8BE3E1'}}>
            <div>
                <button
                    className="btn-black"
                    style={{margin: '0.5rem'}}>View Ingredients</button>
                <button
                    className="btn-black"
                    style={{margin: '0.5rem'}}>Add Ingredient</button>
                <button
                    className="btn-black"
                    style={{margin: '0.5rem'}}>View Recipes</button>
                <button
                    className="btn-black"
                    style={{margin: '0.5rem'}}>Add Recipe</button>
                <button
                    className="btn-black"
                    style={{margin: '0.5rem'}}>View Products</button>
                <button
                    className="btn-black"
                    style={{margin: '0.5rem'}}>Add Products</button>
            </div>
            <button
                className="btn-black"
                style={{margin: '0.5rem'}}
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