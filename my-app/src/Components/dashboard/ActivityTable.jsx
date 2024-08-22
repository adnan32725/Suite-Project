import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ActivityTable = () => {
    const navigate = useNavigate();

    const handleRowClick = (row) => {
        navigate("activitydetail");
    };

    const [data, setData] = useState([
        {
            id: 1,
            name: 'Yoga in the Park',
            jobTitle: 'Activity Coordinator',
            officePhone: '(212) 555-1234',
            email: 'yoga@parkactivities.com',
        },
        {
            id: 2,
            name: 'Community Cleanup',
            jobTitle: 'Volunteer Organizer',
            officePhone: '(415) 555-5678',
            email: 'cleanup@communityvolunteers.org',
        },
        {
            id: 3,
            name: 'Art Workshop',
            jobTitle: 'Workshop Leader',
            officePhone: '(646) 555-8765',
            email: 'art@creativeworkshops.net',
        },
        {
            id: 4,
            name: 'Marathon Training',
            jobTitle: 'Fitness Instructor',
            officePhone: '(202) 555-4321',
            email: 'training@marathonfit.com',
        },
        {
            id: 5,
            name: 'Cooking Class',
            jobTitle: 'Chef Instructor',
            officePhone: '(312) 555-9876',
            email: 'cooking@classculinary.com',
        },
        {
            id: 6,
            name: 'Tech Talk Meetup',
            jobTitle: 'Event Organizer',
            officePhone: '(512) 555-2234',
            email: 'tech@meetuptech.com',
        },
        {
            id: 7,
            name: 'Hiking Adventure',
            jobTitle: 'Trail Guide',
            officePhone: '(303) 555-6789',
            email: 'hiking@adventuretrails.net',
        },
        {
            id: 8,
            name: 'Book Club',
            jobTitle: 'Discussion Leader',
            officePhone: '(718) 555-4321',
            email: 'bookclub@readerscorner.org',
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
            toast.success('Activity updated successfully!', {
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
            toast.success('Activity added successfully!', {
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
        toast.error('Activity deleted successfully!', {
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
            name: 'My Activity',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Activity Title',
            selector: row => row.jobTitle,
            sortable: true,
        },
        {
            name: 'Activity Phone',
            selector: row => row.officePhone,
            sortable: true,
        },
        {
            name: 'Activity Email',
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
                Add Activity
            </Button>

            <DataTable
                title='My Activity'
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
                    <Modal.Title>{isEditing ? 'Edit Activity' : 'Add New Activity'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>My Activity</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Activity Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Activity Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="officePhone"
                                value={formData.officePhone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Activity Email</Form.Label>
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
                    <p>Are you sure you want to delete this Activity?</p>
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

export default ActivityTable;
