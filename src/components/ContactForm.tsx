// "use client"

// import { useState } from 'react'

// const ContactForm = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         message: ''
//     })

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target
//         setFormData(prevState => ({ ...prevState, [name]: value }))
//     }

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault()
//         // Hier zou je normaal gesproken de data naar een backend API sturen
//         console.log('Form submitted:', formData)
//         // Reset het formulier na verzending
//         setFormData({ name: '', email: '', message: '' })
//         alert('Bedankt voor je bericht! Ik neem zo snel mogelijk contact met je op.')
//     }

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Naam</label>
//                 <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                 />
//             </div>
//             <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">E-mail</label>
//                 <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                 />
//             </div>
//             <div>
//                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Bericht</label>
//                 <textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     rows={4}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                 ></textarea>
//             </div>
//             <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white rounded-lg text-lg px-6 py-3 hover:bg-blue-700 transition-colors"
//             >
//                 Verstuur
//             </button>
//         </form>
//     )
// }

// export default ContactForm