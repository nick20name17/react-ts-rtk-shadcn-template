import { ContactForm } from '@/components/contact-form'

const FormPage = () => {
    return (
        <>
            <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
                Form
            </h1>
            <section className='mt-10'>
                <ContactForm />
            </section>
        </>
    )
}

export default FormPage
