import React from 'react'
import ReactDOM from 'react-dom';
import CloseIcon from '@/icons/CloseIcon';
import { Button } from '@/ui/Button'
import { Form, Formik } from "formik";
import { InputField } from '@/ui/InputField';
import { useTripModal } from '@/global-stores/useTripModal';

function AdminNewTripModal() {

    const { set } = useTripModal();

    return ReactDOM.createPortal(
        <div className="modal-overlay fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
          <div className="modal bg-[#f9f9f9] p-8 rounded-lg">
            <div className='modal-con w-full'>
                <div className='modal-header w-full flex items-center justify-between mb-8'>
                    <div className='mr-7'>
                        <h3 className=''>Add a new Trip</h3>
                    </div>
                    <CloseIcon className='cursor-pointer' width={24} height={24}  onClick={()=>{
                        set({
                            isOpen: false
                        })
                    }} />
                </div>
                <div className="modal-form">
                    <Formik<{
                            start_x: string;
                            start_y: string;
                            end_x: string;
                            end_y: string;
                        }>
                        initialValues={
                            {
                                start_x: "",
                                start_y: "",
                                end_x: "",
                                end_y: "",
                            }
                        }
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={({ start_x, start_y, end_x, end_y,}:{
                                start_x: string;
                                start_y: string;
                                end_x: string;
                                end_y: string;
                        }) => {
                        const errors: Record<string, string> = {};
                            // validation should happen here
                           
                            return errors;
                        }}
                        onSubmit={async ({ start_x, start_y, end_x, end_y,}:{
                            start_x: string;
                            start_y: string;
                            end_x: string;
                            end_y: string;
                    }) => {
                            // login functionality goes in here
                        
                        }}
                    >
                        {({ setFieldValue, values, isSubmitting }: any) => (
                        <Form className={`focus:outline-none w-full`}>
                            <div className={` block`}>
                            </div>
                            <div className={`flex flex-col h-full w-full `}>
                                <h3 className='capitalize text-sm mb-4 font-semibold'>Start Point</h3>
                                <div className='flex items-center mb-3'>
                                    <h3 className='capitalize text-sm w-full flex-[42%]'> GPS X Co-ordinates</h3>
                                    <InputField
                                        className={`rounded-lg h-6 flex-[58%] border-[1px] border-primary]`}
                                        border={false}
                                        name="start_x"
                                        maxLength={20}
                                        rounded={true}
                                        placeholder={""}
                                        autoFocus
                                        autoComplete="off"
                                    />
                                </div>

                                <div className='flex items-center mb-3'>
                                    <h3 className='capitalize text-sm w-full flex-[42%]'> GPS Y Co-ordinates</h3>
                                    <InputField
                                        className={`rounded-lg h-6 flex-[58%] border-[1px] border-primary]`}
                                        border={false}
                                        name="start_y"
                                        maxLength={20}
                                        rounded={true}
                                        placeholder={""}
                                        autoFocus
                                        autoComplete="off"
                                    />
                                </div>
                                
                            </div>
                            <div className={`flex flex-col h-full w-full mt-4`}>
                                <h3 className='capitalize text-sm mb-4 font-semibold'>End Point</h3>
                                <div className='flex items-center mb-3'>
                                    <h3 className='capitalize text-sm w-full flex-[42%]'> GPS X Co-ordinates</h3>
                                    <InputField
                                        className={`rounded-lg h-6 flex-[58%] border-[1px] border-primary]`}
                                        border={false}
                                        name="end_x"
                                        maxLength={20}
                                        rounded={true}
                                        placeholder={""}
                                        autoFocus
                                        autoComplete="off"
                                    />
                                </div>

                                <div className='flex items-center mb-3'>
                                    <h3 className='capitalize text-sm w-full flex-[42%]'> GPS Y Co-ordinates</h3>
                                    <InputField
                                        className={`rounded-lg h-6 flex-[58%] border-[1px] border-primary]`}
                                        border={false}
                                        name="end_y"
                                        maxLength={20}
                                        rounded={true}
                                        placeholder={""}
                                        autoFocus
                                        autoComplete="off"
                                    />
                                </div>
                                
                            </div>
                            
                            <div className={`flex mt-8 py-4 space-x-3 l items-center`}>
                                <Button loading={isSubmitting} type="submit" className={`font-light bg-[#40434e] w-full py-4 text-white`}>
                                    Submit
                                </Button>
                            </div>
                        </Form>
                        )}
                    </Formik>
                </div>  
            </div>
          </div>
        </div>,
        document.body
      );
}

export default AdminNewTripModal