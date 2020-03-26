import React,{ useState } from 'react';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();
        const data = {title, description, value};

        try {
            await api.post('incidents', data, {
                headers: {
                    'Authorization': ongId
                }
            });
            history.push('/profile');
        } catch (err) {
            console.log(err);
            alert('Erro ao cadastrar novo caso, por favor tente novamente');
        }
    }

    return (
        <div className="block-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para Home
                    </Link>
                </section>
                <form>
                    <input type="text" placeholder="Título do caso"  onChange={e => setTitle(e.target.value)} value={title}/>
                    <textarea placeholder="Descrição" onChange={e => setDescription(e.target.value)} value={description} />

                    <input type="text" placeholder="Valor em Reais" onChange={e => setValue(e.target.value)} value={value} />

                    <button type="submit" className="button" onClick={handleNewIncident}>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default NewIncident;
