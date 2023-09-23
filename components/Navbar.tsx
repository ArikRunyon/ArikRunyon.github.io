import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

export default function Navbar({ session }: { session: Session }) {

    const user = session.user
    const supabase = useSupabaseClient()
    const { push } = useRouter()

    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#97935C'}}>
            <div>
                <button
                    className="btn-black"
                    style={{margin: '0.5rem'}}
                    onClick={()=>{
                        push('/viewingredients')
                    }}>View Ingredients</button>
                <button
                    className="btn-black"
                    style={{margin: '0.5rem'}}
                    onClick={()=>{
                        push('/addingredient')
                    }}>Add Ingredient</button>
                <button
                    className="btn-black"
                    style={{margin: '0.5rem'}}
                    onClick={()=>{
                        push('/viewrecipes')
                    }}>View Recipes</button>
                <button
                    className="btn-black"
                    style={{margin: '0.5rem'}}
                    onClick={()=>{
                        push('/addrecipes')
                    }}>Add Recipe</button>
                <button
                    className="btn-black"
                    style={{margin: '0.5rem'}}
                    onClick={()=>{
                        push('/viewproducts')
                    }}>View Products</button>
                <button
                    className="btn-black"
                    style={{margin: '0.5rem'}}
                    onClick={()=>{
                        push('/addproducts')
                    }}>Add Products</button>
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