import { useState } from 'react';
import './App.css';
import List from './components/List';
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactModal from 'react-modal';

const toDo = [
  {
    labelColor: '#0dde4d',
    title: 'Project A',
  },
  {
    labelColor: '#dec30d',
    title: 'Project B',
  },
  {
    labelColor: '#b80dde',
    title: 'Project C',
  },
  {
    labelColor: '#de750d',
    title: 'Project M',
  },
  {
    labelColor: '#0dd4de',
    title: 'Project K',
  }
]

const inProgress = [
  {
    labelColor: '#d276ff',
    title: 'Project G',
  },
  {
    labelColor: '#de0d0d',
    title: 'Project P',
  },
  {
    labelColor: '#0dde93',
    title: 'Project F',
  },
  {
    labelColor: 'lightgrey',
    title: 'Project Z',
  }
]

const review = [
  {
    labelColor: '#0db5de',
    title: 'Project W',
  },
  {
    labelColor: 'lightgrey',
    title: 'Project T',
  },
  {
    labelColor: '#0dde4d',
    title: 'Project U',
  },
  {
    labelColor: '#b80dde',
    title: 'Project Q',
  },
  {
    labelColor: '#dec30d',
    title: 'Project V',
  }
]

const done = [
  {
    labelColor: '#0db5de',
    title: 'Project D',
  },
  {
    labelColor: '#d276ff',
    title: 'Project N',
  },
  {
    labelColor: '#dec30d',
    title: 'Project X',
  },
  {
    labelColor: 'lightgrey',
    title: 'Project R',
  }
]

function App() {
  const [state, setState] = useState({toDo, inProgress, review, done})
  const [form, setForm] = useState(null)

  const moveCard = (source, destination, cardIndex) => {
    const sourceList = state[source];
    const destinationList = state[destination];
    const card = sourceList[cardIndex];
    sourceList.splice(cardIndex, 1);
    destinationList.push(card);
    setState({ ...state });
  };

  const handleClick = (listKey) => {
    let title = {toDo: 'To Do', inProgress: 'In Progress', review: 'Review', done: 'Done'}
    setForm({
      title: title[listKey],
      listKey,
      projectName: '',
      labelColor: ''
    })
  }

  const handleForm = (e) => {
    e.preventDefault()
    let title = form.projectName
    let labelColor = form.labelColor
    let listKey = form.listKey

    let newState = {...state}
    newState[listKey].push({title, labelColor})
    setState(newState)
    setForm(null)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <List title={'To Do'} data={state.toDo} listKey={'toDo'} moveCard={moveCard} onAddClick={() => handleClick('toDo')}/>
        <List title={'In Progress'} data={state.inProgress} listKey={'inProgress'} moveCard={moveCard}  onAddClick={() => handleClick('inProgress')}/>
        <List title={'Review'} data={state.review} listKey={'review'} moveCard={moveCard}  onAddClick={() => handleClick('review')}/>
        <List title={'Done'} data={state.done} listKey={'done'} moveCard={moveCard}  onAddClick={() => handleClick('done')}/>
      </div>
      <ReactModal
        isOpen={Boolean(form)}
        style={{content: {maxWidth: 300, height: 'fit-content', transform: 'translateX(-50%) translateY(-50%)', top: '50%', left: '50%'}}}
        >
        <form onSubmit={handleForm} style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          <h4 style={{margin: 0}}>To Do</h4>
          <input type='text' placeholder='Project Name' value={form?.projectName} onChange={e => setForm(prev => ({...prev, projectName: e.target.value}))}  style={{height: 30, width: '100%', border: '1px solid grey', outline: 'none', padding: '0 10px'}}/>
          <input type='color' placeholder='Project Name' value={form?.labelColor} onChange={e => setForm(prev => ({...prev, labelColor: e.target.value}))} style={{height: 30, width: '100%', border: '1px solid grey', outline: 'none'}}/>
          <input type='submit' value='Add' style={{height: 30, width: '100%', border: '1px solid grey', outline: 'none'}}/>
        </form>
      </ReactModal>
    </DndProvider>
  );
}

export default App;
