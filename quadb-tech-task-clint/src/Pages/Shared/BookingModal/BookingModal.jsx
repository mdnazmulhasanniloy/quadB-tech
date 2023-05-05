import React, { useContext, useState, useEffect } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { toast } from 'react-hot-toast';
import { AuthContext } from './../../../Provider/AuthProvider';

const BookingModal = ({ setModalOpen, bookingData }) => {
    const { user } = useContext(AuthContext); 
    const [loading, setLoading] = useState(false); 

    
    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        const form = event.target;
        const phone = form.phoneNumber.value;

        const bookingInfo = {
            bookingData,
            paid: false,
            email: user.email,
            bayerName: user.displayName,
            bayerPhone: phone,

        }

        fetch('https://quadb-tech-server.vercel.app/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Order successfully added')
                    setLoading(false)
                    setModalOpen(false)

                }

            })
            .catch(err => {
                toast.error(err.message)
                setLoading(false)
            })
    }

    return (
        <div>
            <input type="checkbox" id="Booking-Modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="Booking-Modal" className="absolute right-2 top-2 hover:rotate-90 transform-all duration-500 cursor-pointer" title='Close'><GrFormClose className='text-4xl text-accent' /></label>
                    <h3 className="text-lg font-bold">{bookingData?.name}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label htmlFor="Name">status</label>
                            <input type="text" placeholder="Status" value={`${bookingData?.status}`} disabled name="price" className="input input-bordered " />
                        </div>
                        
                        <div className="form-control">
                            <label htmlFor="Name">Name</label>
                            <input type="text" placeholder="Full Name" defaultValue={user?.displayName} disabled name="Name" className="input input-bordered " />
                        </div>
                        <div className="form-control">
                            <label htmlFor="Email">Email</label>
                            <input type="email" placeholder="Email" defaultValue={user?.email} disabled name="email" className="input input-bordered " />
                        </div>
                        <div className="form-control my-5">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type="phone" placeholder="Phone Number" name="phoneNumber" className="input input-bordered " />
                        </div>
                        <div className="form-control my-5">
                            <button type="submit" className={
                                loading ?
                                    'btn btn-accent loading text-white'
                                    : 'btn btn-accent text-white'
                            }>{loading? 'Loading...' : 'SUBMIT' } </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BookingModal;