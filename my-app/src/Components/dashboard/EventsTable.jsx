import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventsTable = () => {
    const navigate = useNavigate();

    const handleRowClick = (row) => {
        navigate("eventsdetail");
    };

    const [data, setData] = useState([
        {
            id: 1,
            name: 'Christina Giese',
            jobTitle: 'Mgr Operations',
            officePhone: '(619) 371-9107',
            email: 'phone50@example.org',
        },
        {
            id: 2,
            name: 'Ethel Hahne',
            jobTitle: 'President',
            officePhone: '(110) 738-6828',
            email: 'support42@example.it',
        },
        {
            id: 3,
            name: 'Daren Lerma',
            jobTitle: 'IT Developer',
            officePhone: '(211) 222-3911',
            email: 'hr.beans.dev@example.com',
        },
        {
            id: 4,
            name: 'Billie Karim',
            jobTitle: 'VP Sales',
            officePhone: '(952) 848-2967',
            email: 'section66@example.de',
        },
        {
            id: 5,
            name: 'Elvia Ronk',
            jobTitle: 'Director Sales',
            officePhone: '(963) 775-8810',
            email: 'info.sales@example.tw',
        },
        {
            id: 6,
            name: 'John Ronk',
            jobTitle: 'Director Development',
            officePhone: '(963) 665-7710',
            email: 'info.devs@example.tw',
        },
        {
            id: 7,
            name: 'Elvia Ronk',
            jobTitle: 'Director Sales',
            officePhone: '(963) 775-8810',
            email: 'info.sales@example.tw',
        },
        {
            id: 8,
            name: 'Billie Karim',
            jobTitle: 'VP Sales',
            officePhone: '(952) 848-2967',
            email: 'section66@example.de',
        },
    ]);

    const [show, setShow] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        jobTitle: '',
        officePhone: '',
        email: ''
    });

    const handleClose = () => {
        setShow(false);
        setIsEditing(false);
        setFormData({
            name: '',
            jobTitle: '',
            officePhone: '',
            email: ''
        });
    };

    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            setData(data.map(item =>
                item.id === currentId ? { ...item, ...formData } : item
            ));
            toast.success('Event updated successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            const newEntry = {
                id: data.length + 1,
                ...formData
            };
            setData([...data, newEntry]);
            toast.success('Event added successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        handleClose();
    };

    const confirmDelete = (id) => {
        setData(data.filter(user => user.id !== id));
        toast.error('Event deleted successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setShowDeleteModal(false);
    };

    const handleDeleteClick = (id) => {
        setCurrentId(id);
        setShowDeleteModal(true);
    };

    const editUser = (row) => {
        setIsEditing(true);
        setCurrentId(row.id);
        setFormData({
            name: row.name,
            jobTitle: row.jobTitle,
            officePhone: row.officePhone,
            email: row.email
        });
        handleShow();
    };

    const columns = [
        {
            name: 'My Event',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Event Title',
            selector: row => row.jobTitle,
            sortable: true,
        },
        {
            name: 'Event Phone',
            selector: row => row.officePhone,
            sortable: true,
        },
        {
            name: 'Event Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <div>
                    <FaEdit onClick={() => editUser(row)} style={{ marginRight: '10px', cursor: 'pointer' }} />
                    <FaTrash onClick={() => handleDeleteClick(row.id)} style={{ cursor: 'pointer' }} />
                </div>
            ),
        },
    ];

    return (
        <>
            <Button variant="primary" onClick={handleShow} style={{ marginBottom: '10px', background: '#534D64' }}>
                Add Event
            </Button>

            <DataTable
                title='My Event'
                columns={columns}
                data={data}
                pagination
                paginationPerPage={5}
                onRowClicked={handleRowClick}
                pointerOnHover
                highlightOnHover
            />

            <Modal show={show} onHide={handleClose} style={{ marginTop: '30px' }}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Edit Event' : 'Add New Event'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>My Event</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Event Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Event Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="officePhone"
                                value={formData.officePhone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Event Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{ background: '#534D64' }}>
                            {isEditing ? 'Update' : 'Submit'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} style={{ marginTop: '30px' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this Event?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => confirmDelete(currentId)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </>
    );
};

export default EventsTable;
