import React, {useState, useEffect} from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'


const App = () => {
  //states
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("A new note")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  //function for getting notes
  const hook = () => {
    noteService.getAll()
      .then(initialData => setNotes(initialData))
  }

  //effect for getting notes and saving to state
  useEffect(hook, [])

  //array of notes to show on screen
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  //function for toggling importance of notes
  const toggleImportanceOf = (id) => {
    const url = `https://localhost:3001/notes/${id}`
    const note = notes.find(note => note.id === id)
    const changedNote = {...note, important: !note.important}

    noteService.updateNote(changedNote, id)
      .then(updatedData => {
        setNotes(notes.map(note => note.id !== id ? note : updatedData))
      })
      .catch(error => {
        const message =`The note ${note.content} has already been deleted from the server`
        setErrorMessage(message)
        setTimeout( () => setErrorMessage(null), 5000)
        setNotes(notes.filter(note => note.id !== id ))
      })
  }

  //function for adding a note
  const addNote = (event) => {
    event.preventDefault()
    const noteObject ={
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() <0.5
    }

    noteService.createNote(noteObject)
      .then(addedData => {
        setNewNote('')
        setNotes(notes.concat(addedData))
      })
  }

  //handling changes to the 'newNote' state
  const handleNewNoteChange = (event) => {
    setNewNote(event.target.value)
  }


  //handling changes to the showAll state
  const handleShowAllChange = (event) => {
    setShowAll(!showAll)
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <ul>
        {notesToShow.map((note) => 
            <Note note={note} key={note.id} toggleImportance={() => toggleImportanceOf(note.id)}/>
            )
        }
      </ul>
      <form onSubmit={addNote}>
        <input 
            value={newNote} 
            onChange={handleNewNoteChange}/>
        <button type="submit">save</button>
      </form>
      <button onClick={handleShowAllChange}>Show {showAll ? "important" : "all"}  </button>
      <Footer />
    </div>
  )
}

export default App