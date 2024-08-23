import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//ContactLogTable......
const ContactLogTable = () => {
    const navigate = useNavigate();

    const handleRowClick = (row) => {
        navigate("contactlogdetail");
    };

    const [data, setData] = useState([
        {
            id: 1,
            name: 'Michael Johnson',
            jobTitle: 'Lead Sales Representative',
            officePhone: '(212) 555-8765',
            email: 'mjohnson@contactlog.com',
        },
        {
            id: 2,
            name: 'Sarah Thompson',
            jobTitle: 'Customer Service Manager',
            officePhone: '(415) 555-1234',
            email: 'sthompson@contactlog.com',
        },
        {
            id: 3,
            name: 'David Williams',
            jobTitle: 'Business Development Executive',
            officePhone: '(646) 555-4321',
            email: 'dwilliams@contactlog.com',
        },
        {
            id: 4,
            name: 'Emily Davis',
            jobTitle: 'Client Relations Specialist',
            officePhone: '(202) 555-5678',
            email: 'edavis@contactlog.com',
        },
        {
            id: 5,
            name: 'James Brown',
            jobTitle: 'Key Account Manager',
            officePhone: '(312) 555-2234',
            email: 'jbrown@contactlog.com',
        },
        {
            id: 6,
            name: 'Jessica Miller',
            jobTitle: 'Customer Success Manager',
            officePhone: '(512) 555-9876',
            email: 'jmiller@contactlog.com',
        },
        {
            id: 7,
            name: 'Christopher Garcia',
            jobTitle: 'Sales Operations Coordinator',
            officePhone: '(303) 555-6789',
            email: 'cgarcia@contactlog.com',
        },
        {
            id: 8,
            name: 'Ashley Martinez',
            jobTitle: 'Technical Support Lead',
            officePhone: '(718) 555-8765',
            email: 'amartinez@contactlog.com',
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
            toast.success('Contact Log updated successfully!', {
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
            toast.success('Contact Log added successfully!', {
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
        toast.error('Contact Log deleted successfully!', {
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
            name: 'My Contact Log',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Contact Log Title',
            selector: row => row.jobTitle,
            sortable: true,
        },
        {
            name: 'Contact Log Phone',
            selector: row => row.officePhone,
            sortable: true,
        },
        {
            name: 'Contact Log Email',
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
                Add Contact Log
            </Button>

            <DataTable
                title='My Contact Log'
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
                    <Modal.Title>{isEditing ? 'Edit Contact Log' : 'Add New Contact Log'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>My Contact Log</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact Log Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact Log Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="officePhone"
                                value={formData.officePhone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact Log Email</Form.Label>
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
                    <p>Are you sure you want to delete this Contact Log?</p>
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

export default ContactLogTable;
