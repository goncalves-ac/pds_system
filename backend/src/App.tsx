import { useEffect } from 'react'
import logo from './files/logo.svg';
import './css/App.css';

import * as firestore from './firestore-services/getters'

function App() {

  useEffect(() => {
    document.title = 'Back-end: Clinica Social';

    console.log('Dados de todos os clientes')
    console.log(firestore.getCollectionData('clientes'))
    console.log('Dados de um cliente específico, o Josué')
    console.log(firestore.getDocumentData('clientes','Josué'))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          List of API calls:
        </h1>
        <table>
          <tr>
            <th>Time (optional)</th>
            <th>API call</th>
          </tr>
          <tr>
            <td>11:30am</td>
            <td>POST/something</td>
          </tr>
          <tr>
            <td>11:31am</td>
            <td>GET/something</td>
          </tr>
        </table>
      </header>
    </div>
  );
}

export default App;
