'use client'

import { useState, useCallback } from 'react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import useRegisterModal from '@/hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '@/components/Heading'
import Input from '@/components/Inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'


const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const [loading, setLoading] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
            name: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true)
        axios.post('/api/register', data)
            .then(res => {
                registerModal.onClose()
            })
            .catch(err => {
                toast.error('Something went wrong! Please try again later.')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title="Welcome to Airbnb" subtitle='Create an account!'/>
            <Input
                id='email'
                label='Email'
                disabled={loading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='name'
                label='Name'
                disabled={loading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='password'
                label='Password'
                type='password'
                disabled={loading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
                outline
                label={"Continue with Google"}
                icon={FcGoogle}
                disabled={loading}
                onClick={() => {}}
            />
            <Button
                outline
                label={"Continue with Github"}
                icon={AiFillGithub}
                disabled={loading}
                onClick={() => {}}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex flex-row items-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div onClick={registerModal.onClose} className='text-neutral-800 cursor-pointer hover:underline'>
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disable={loading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal