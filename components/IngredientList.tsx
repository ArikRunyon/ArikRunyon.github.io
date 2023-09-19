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
        <div style={{width: '15rem'}}>
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
        <div style={{width: '15rem'}}>
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
        <div style={{width: '15rem'}}>
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
        <div style={{width: '15rem'}}>
          Easily Grown: <br/>
          <div>
            <fieldset>
            <input
                className="cursor-pointer"
                type="radio"
                id='yesbox'
                onChange={(e) => {
                  setErrorText('')
                  setNewEasilyGrown(e.target.checked)
                }}
              /> Yes 
              <input
                className="cursor-pointer"
                type="radio"
                id='nobox'
                onChange={(e) => {
                  setErrorText('')
                  setNewEasilyGrown(e.target.checked)
                }}
              /> No
              </fieldset>
          </div>
        </div>
        <button className="btn-black" type="submit">
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
          className="w-4 h-4 ml-2 border-2 hover:border-black rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
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
