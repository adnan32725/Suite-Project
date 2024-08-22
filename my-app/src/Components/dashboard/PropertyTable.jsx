import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PropertyTable = () => {
    const navigate = useNavigate();

    const handleRowClick = (row) => {
        navigate("propertydetail");
    };

    const [data, setData] = useState([
        {
            id: 1,
            name: 'Sunset Villas',
            jobTitle: 'Property Manager',
            officePhone: '(312) 555-1023',
            email: 'contact@sunsetvillas.com',
        },
        {
            id: 2,
            name: 'Ocean Breeze Apartments',
            jobTitle: 'Senior Property Director',
            officePhone: '(415) 555-4587',
            email: 'info@oceanbreezeapartments.org',
        },
        {
            id: 3,
            name: 'Pinewood Estates',
            jobTitle: 'Maintenance Supervisor',
            officePhone: '(646) 555-7743',
            email: 'support@pinewoodestates.net',
        },
        {
            id: 4,
            name: 'Maplewood Heights',
            jobTitle: 'Leasing Agent',
            officePhone: '(202) 555-3367',
            email: 'leasing@maplewoodheights.com',
        },
        {
            id: 5,
            name: 'Lakeside Towers',
            jobTitle: 'Property Coordinator',
            officePhone: '(512) 555-2234',
            email: 'coordinator@lakesidetowers.net',
        },
        {
            id: 6,
            name: 'Riverbend Condos',
            jobTitle: 'Building Superintendent',
            officePhone: '(602) 555-9981',
            email: 'super@riverbendcondos.org',
        },
        {
            id: 7,
            name: 'Hilltop Residences',
            jobTitle: 'Resident Services Manager',
            officePhone: '(303) 555-4321',
            email: 'services@hilltopresidences.com',
        },
        {
            id: 8,
            name: 'Creekside Cottages',
            jobTitle: 'Property Supervisor',
            officePhone: '(718) 555-7890',
            email: 'supervisor@creeksidecottages.net',
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
            toast.success('Property updated successfully!', {
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
            toast.success('Property added successfully!', {
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
        toast.error('Property deleted successfully!', {
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
            name: 'My Property',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Property Title',
            selector: row => row.jobTitle,
            sortable: true,
        },
        {
            name: 'Property Phone',
            selector: row => row.officePhone,
            sortable: true,
        },
        {
            name: 'Property Email',
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
                Add Property
            </Button>

            <DataTable
                title='My Property'
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
                    <Modal.Title>{isEditing ? 'Edit Property' : 'Add New Property'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>My Property</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Property Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Property Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="officePhone"
                                value={formData.officePhone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Property Email</Form.Label>
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
                    <p>Are you sure you want to delete this Property?</p>
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

export default PropertyTable;
