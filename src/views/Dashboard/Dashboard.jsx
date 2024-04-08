import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '../../Redux/actions';
import { validateInput } from '../../validation/validationCreateEvent';
import Swal from 'sweetalert2';

function Dashboard() {
    const [showInput, setShowInput] = useState(false);
    const [nameOfEvent, setNameOfEvent] = useState('');
    const [participants, setParticipants] = useState(['']);
    const [date, setDate] = useState('');
    const [details, setDetails] = useState('');
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = validateInput(nameOfEvent, participants, date, details);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const eventInfo = {
            nameOfEvent,
            participants,
            date,
            details
        };

        try {
            Swal.fire({
                title: "Attention!",
                text: "Are you sure you want to create this event?",
                inputAttributes: {
                    autocapitalize: "off",
                },
                showCancelButton: true,
                confirmButtonText: "Confirm",
                cancelButtonText: "Review",
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    dispatch(createEvent(eventInfo));
                    setNameOfEvent('');
                    setParticipants(['']);
                    setDate('');
                    setDetails('');
                    return Promise.resolve();
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Success",
                        text: "Event created successfully!",
                        icon: "success",
                        timer: "4000",
                    });
                    console.log("Event created");
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    const handleParticipantChange = (index, value) => {
        const newParticipants = [...participants];
        newParticipants[index] = value;
        setParticipants(newParticipants);
    }

    const addParticipant = () => {
        setParticipants([...participants, '']);
    }
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{2}$/;
    const isFormInvalid = Object.keys(errors).length > 0 || !nameOfEvent || !date || !details || participants.some(participant => !participant) || !dateRegex.test(date);

    return (
        <div>
            Dashboard
            <br />
            <button onClick={() => setShowInput(true)}>Create New Event</button>
            {showInput &&
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter event name" value={nameOfEvent} onChange={(e) => setNameOfEvent(e.target.value)} />
                    <br />
                    {participants.map((participant, index) => (
                        <input key={index} type="text" placeholder="Enter participant" value={participant} onChange={(e) => handleParticipantChange(index, e.target.value)} />
                    ))}
                    <button type="button" onClick={addParticipant}>Add Participant</button>
                    <br />
                    <input type="text" placeholder="Enter event date dd/mm/yy" value={date} onChange={(e) => setDate(e.target.value)} />
                    <br />
                    <input type="text" placeholder="Enter event details" value={details} onChange={(e) => setDetails(e.target.value)} />
                    <br />
                    <button type="submit" disabled={isFormInvalid}>Submit</button>
                </form>
            }
        </div>
    );
}

export default Dashboard;