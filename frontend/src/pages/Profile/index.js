import React, { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import swal from "sweetalert";

function Profile() {

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    useEffect(() => {
        (async () => {
            const { data } = await api.get('profile', {
                headers: {
                    'Authorization': ongId
                }
            });
            setIncidents(data);
        })();
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    'Authorization': ongId
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            swal('Erro ao deletar caso', 'Por favor tente novamente', 'error');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {
                    incidents.map(incident =>
                        (<li key={incident.id}>
                            <strong>Caso</strong>
                            <p>{incident.title}</p>

                            <strong>Descrição</strong>
                            <p>{incident.description}</p>

                            <strong>Valor</strong>
                            <p>{Intl.NumberFormat('pt-Br', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(incident.value)}</p>
                            <button type="button">
                                <FiTrash2 size={20} color="#a8a8b3" onClick={() => handleDeleteIncident(incident.id)}/>
                            </button>
                        </li>))
                }
            </ul>
        </div>
    );
}

export default Profile;
