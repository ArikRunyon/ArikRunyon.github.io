import { Database } from '@/lib/schema'
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

type Ingredients = Database['public']['Tables']['ingredients']['Row']

export default function ViewIngredients () {
    
    const supabase = useSupabaseClient<Database>()
    const [ingredients, setIngredients] = useState<Ingredients[]>([])

    useEffect(() => {
        const fetchIngredients = async () => {
          const { data: ingredients, error } = await supabase
            .from('ingredients')
            .select('*')
            .order('id', { ascending: true })
    
          if (error) console.log('error', error)
          else setIngredients(ingredients)
        }
    
        fetchIngredients()
    }, [supabase])

    const deleteIngredient = async (id: number) => {
        try {
            await supabase.from('ingredients').delete().eq('id', id).throwOnError()
            setIngredients(ingredients.filter((x) => x.id != id))
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <div style={{display: 'flex', flexFlow: 'row', flexWrap: 'wrap'}}>
          {ingredients.map((ingredient) => (
            <Ingredient key={ingredient.id} ingredient={ingredient} onDelete={() => deleteIngredient(ingredient.id)} />
          ))}
        </div>
    )
}


const Ingredient = ({ ingredient: ingredient, onDelete }: { ingredient: Ingredients; onDelete: () => void }) => {
    const supabase = useSupabaseClient<Database>()
  
    return (
        <div style={{margin: '0.25rem', width: '15rem', backgroundColor: 'gray', padding: '1rem', display: 'flex', flexDirection: 'column'}}>
            <div className="text-sm leading-5 font-medium truncate">Name: {ingredient.ingredient_name}</div>
            <div className="text-sm leading-5 font-medium truncate">Benefits: {ingredient.benefit}</div>
            <div className="text-sm leading-5 font-medium truncate">Risks: {ingredient.risks}</div>
            <div className="text-sm leading-5 font-medium truncate">Easily Grown: {ingredient.easily_grown ? 'Yes' : 'No'}</div>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onDelete()
            }}
            className="btn-black"
          >
            Delete
          </button>
        </div>
    )
  }
  
  const Alert = ({ text }: { text: string }) => (
    <div className="rounded-md bg-red-100 p-4 my-3">
      <div className="text-sm leading-5 text-red-700">{text}</div>
    </div>
  )
  