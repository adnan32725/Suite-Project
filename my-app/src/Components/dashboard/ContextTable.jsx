import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContextTable = () => {
    const navigate = useNavigate();

    const handleRowClick = (row) => {
        navigate("contextdetail");
    };

    const [data, setData] = useState([
        {
            id: 1,
            name: 'Sophia Turner',
            jobTitle: 'Project Manager',
            officePhone: '(312) 555-8765',
            email: 'sophia.turner@projectmanager.com',
        },
        {
            id: 2,
            name: 'James Robinson',
            jobTitle: 'Chief Executive Officer',
            officePhone: '(415) 555-2332',
            email: 'james.robinson@ceocorp.org',
        },
        {
            id: 3,
            name: 'Olivia Anderson',
            jobTitle: 'Lead Software Engineer',
            officePhone: '(646) 555-9987',
            email: 'olivia.anderson@softengineer.net',
        },
        {
            id: 4,
            name: 'Michael Brown',
            jobTitle: 'Vice President of Marketing',
            officePhone: '(202) 555-6677',
            email: 'michael.brown@vpmarketing.com',
        },
        {
            id: 5,
            name: 'Emma Johnson',
            jobTitle: 'Sales Director',
            officePhone: '(512) 555-8890',
            email: 'emma.johnson@salesdirect.net',
        },
        {
            id: 6,
            name: 'William Davis',
            jobTitle: 'Director of Engineering',
            officePhone: '(602) 555-7811',
            email: 'william.davis@engineeringdir.org',
        },
        {
            id: 7,
            name: 'Ava Wilson',
            jobTitle: 'Senior Account Manager',
            officePhone: '(303) 555-2345',
            email: 'ava.wilson@accountmanagers.com',
        },
        {
            id: 8,
            name: 'Ethan Martinez',
            jobTitle: 'Operations Manager',
            officePhone: '(718) 555-6789',
            email: 'ethan.martinez@operationsman.net',
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
            toast.success('User updated successfully!', {
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
            toast.success('User added successfully!', {
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
        toast.error('User deleted successfully!', {
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
            name: 'My Contexts',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Contexts Title',
            selector: row => row.jobTitle,
            sortable: true,
        },
        {
            name: 'Contexts Phone',
            selector: row => row.officePhone,
            sortable: true,
        },
        {
            name: 'Contexts Email',
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
                Add Context
            </Button>

            <DataTable
                title='My Contexts'
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
                    <Modal.Title>{isEditing ? 'Edit Context' : 'Add New Context'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>My Contexts</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Context Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Context Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="officePhone"
                                value={formData.officePhone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Context Email</Form.Label>
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
                    <p>Are you sure you want to delete this Context?</p>
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

export default ContextTable;
