import { Database } from '@/lib/schema'
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

type Ingredients = Database['public']['Tables']['ingredients']['Row']

export default function IngredientList({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const [ingredients, setIngredients] = useState<Ingredients[]>([])
  const [newIngredientName, setNewIngredientName] = useState('')
  const [newBenefit, setNewBenefit] = useState('')
  const [newRisks, setNewRisks] = useState('')
  const [newEasilyGrown, setNewEasilyGrown] = useState(true)
  const [errorText, setErrorText] = useState('')
  
  const user = session.user

  const newIngredient: Object = {
    ingredient_name: newIngredientName,
    benefit: newBenefit,
    risks: newRisks,
    easily_grown: newEasilyGrown,
    user_id: user.id
  }


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

  const addIngredient = async (newIngredient: Object, ) => {
    if (newIngredient) {
      const { data: newIngredient, error } = await supabase
        .from('ingredients')
        .insert({ 
          ingredient_name: newIngredientName,
          benefit: newBenefit,
          risks: newRisks,
          easily_grown: newEasilyGrown,
          user_id: user.id 
        })
        .select()
        .single()

      if (error) {
        setErrorText(error.message)
      } else {
        setIngredients([...ingredients, newIngredient])
        setNewIngredientName('')
        setNewBenefit('')
        setNewRisks('')
        setNewEasilyGrown(true)
      }
    }
  }

  const deleteIngredient = async (id: number) => {
    try {
      await supabase.from('ingredients').delete().eq('id', id).throwOnError()
      setIngredients(ingredients.filter((x) => x.id != id))
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className="w-full">
      <h1 className="mb-12">Ingredient List.</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addIngredient(newIngredient)
        }}
        className="flex gap-2 my-2"
      >
        <div>
        Name: 
        <input
          className="rounded w-full p-2"
          type="text"
          placeholder="Spinach"
          value={newIngredientName}
          onChange={(e) => {
            setErrorText('')
            setNewIngredientName(e.target.value)
          }}
        />
        </div>
        <div>
        Benefits: 
        <input
          className="rounded w-full p-2"
          type="text"
          placeholder="Super Strength"
          value={newBenefit}
          onChange={(e) => {
            setErrorText('')
            setNewBenefit(e.target.value)
          }}
        />
        </div>
        <div>
        Risks: 
        <input
          className="rounded w-full p-2"
          type="text"
          placeholder="Cancer"
          value={newRisks}
          onChange={(e) => {
            setErrorText('')
            setNewRisks(e.target.value)
          }}
        />
        </div>
        <div>
          Easily Grown: <br/>
          <div>
            <div>
              <input
                  name='easygrown'
                  type="radio"
                  id='yesbox'
                  onChange={(e) => {
                    setErrorText('')
                    setNewEasilyGrown(true)
                  }}
              /> Yes 
            </div>
            <div>
                <input
                  name='easygrown'
                  type="radio"
                  id='nobox'
                  onChange={(e) => {
                    setErrorText('')
                    setNewEasilyGrown(false)
                  }}
              /> No
            </div>
          </div>
        </div>
        <button className="btn-black" type="submit" style={{width: '10rem'}}>
          Add
        </button>
      </form>
      {!!errorText && <Alert text={errorText} />}
      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul>
          {ingredients.map((ingredient) => (
            <Ingredient key={ingredient.id} ingredient={ingredient} onDelete={() => deleteIngredient(ingredient.id)} />
          ))}
        </ul>
      </div>
    </div>
  )
}

const Ingredient = ({ ingredient: ingredient, onDelete }: { ingredient: Ingredients; onDelete: () => void }) => {
  const supabase = useSupabaseClient<Database>()

  return (
    <li className="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out">
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <div className="text-sm leading-5 font-medium truncate">Name: {ingredient.ingredient_name}</div>
          <div className="text-sm leading-5 font-medium truncate">Benefits: {ingredient.benefit}</div>
          <div className="text-sm leading-5 font-medium truncate">Risks: {ingredient.risks}</div>
          <div className="text-sm leading-5 font-medium truncate">Easily Grown: {ingredient.easily_grown ? 'Yes' : 'No'}</div>
        </div>
        <div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete()
          }}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

const Alert = ({ text }: { text: string }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
)
