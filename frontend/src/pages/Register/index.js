import React, { useState } from 'react';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = { name, email, city, whatsapp, uf };
        try {
            const response = await api.post('ongs', data);
            const { id } = response.data;
            alert(`Seu ID: ${id}`);
            history.push('/', { id });
        } catch (err) {
            console.log(err);
            alert(`Erro: ${err.message}`);
        }
    }

    return (
        <div className="block-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Efetuar Log-in
                    </Link>
                </section>
                <form>
                    <input type="text" placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)}/>
                    <input type="email" placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="text" placeholder="WhatsApp" value={whatsapp}
                           onChange={e => setWhatsapp(e.target.value)}/>
                    <div className="input-group">
                        <input type="text" placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)}/>
                        <input type="text" placeholder="UF" style={{ width: 80 }} value={uf}
                               onChange={e => setUf(e.target.value)}/>
                    </div>
                    <button onClick={handleRegister} type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
