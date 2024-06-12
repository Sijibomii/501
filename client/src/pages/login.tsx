import React from 'react'
import CircleIcon from '@/icons/Circle'
import { Button } from '@/ui/Button'
import { Form, Formik } from "formik";
import { InputField } from '@/ui/InputField';


function LoginPage() {


  return (
    <div className='login-page w-screen h-screen flex items-center'>
        <div className='login-page-container w-full h-full flex items-center'>
            <div className='lft-login flex-[55%]'>
                <div className='lft-login-con flex items-center justify-center'>
                    <div className='lft-login-modal'>
                        <div className='lft-login-modal-con'>
                            <div className='lft-login-modal-1'>
                                <div className='lft-login-modal-1-top flex items-center'>
                                    <div className='lft-login-modal-1-circle mr-3'>
                                        <CircleIcon color={'#058c42'} width={20} height={20} />
                                    </div>
                                    <div className=''>
                                        <h3 className='uppercase text-primary text-lg font-semibold'>bus tracker</h3>
                                    </div>
                                </div>
                                <div className='lft-login-modal-1-bottom mt-4'>
                                    <div className=''>
                                        <h3 className='capitalize text-primary text-lg '>always on time</h3>
                                    </div>
                                </div>
                            </div>
                            <div className='lft-login-modal-2 flex items-center mt-10 border-secondary border-[1px] rounded-lg'>
                                <Button size='xxl' color='secondary' className=''>
                                    <h4 className='text-white font-light'>Admin</h4>
                                </Button>
                                <Button className='' size='xxl' color='transparent'>
                                    <h4 className='text-secondary font-light'>User</h4>
                                </Button>
                            </div>
                            <div className='lft-login-modal-3 flex flex-col items-left mt-2 py-8'>
                                <div className='heading'>
                                    <h3 className='text-primary font-bold text-xl'>Sign-in to Account</h3>
                                </div>
                                <div className='lg-form py-12'>
                                    <Formik<{
                                            username: string;
                                            password: string;
                                        }>
                                        initialValues={
                                            {
                                                username: "",
                                                password: "",
                                            }
                                        }
                                        validateOnChange={false}
                                        validateOnBlur={false}
                                        validate={({ username, password }:{
                                            username: string;
                                            password: string;
                                        }) => {
                                        const errors: Record<string, string> = {};
                                            // validation should happen here
                                            if (username.length < 2) {
                                                return {
                                                    username: "username too short",
                                                };
                                            }
                                            if (password.length <2 ){
                                                return {
                                                    password: "password too short",
                                                };
                                            }
                                            return errors;
                                        }}
                                        onSubmit={async ({ username, password }:{
                                            username: string;
                                            password: string;
                                        }) => {
                                            // login functionality goes in here
                                        
                                        }}
                                    >
                                        {({ setFieldValue, values, isSubmitting }: any) => (
                                        <Form className={`focus:outline-none w-full`}>
                                            <div className={` block`}>
                                            </div>
                                            <div className={`flex h-full w-full `}>
                                            <InputField
                                                className={`rounded-8 bg-primary-700 h-6`}
                                                name="username"
                                                maxLength={60}
                                                placeholder={"Username"}
                                                autoFocus
                                                autoComplete="off"
                                            />
                                            </div>
                                            <div className={` h-6`}>
                                            </div>
                                            <div className={`flex bg-primary-700 rounded-8`}>
                                            <InputField
                                                className={`h-11 w-full`}
                                                name="password"
                                                maxLength={60}
                                                placeholder={"password"}
                                            />
                                            </div>
                                            <div className={`flex mt-8 py-4 space-x-3 l items-center`}>
                                                <Button loading={isSubmitting} type="submit" className={`font-light bg-[#40434e] w-full py-4 text-white`}>
                                                    Sign In
                                                </Button>
                                            </div>
                                        </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='rgt-login flex-[45%]'>
                <div className='rgt-login-con w-full h-full'>
                    <img
                        src="/img/bus.avif" 
                        alt="Bus Image"
                        className='w-full h-screen'
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage
