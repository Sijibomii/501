import React from 'react'
import ReactDOM from 'react-dom';
import { useBusInventoryModal } from '@/global-stores/useBusInventoryModal';
import CloseIcon from '@/icons/CloseIcon';
import { Button } from '@/ui/Button'
import { Form, Formik } from "formik";
import { InputField } from '@/ui/InputField';

function AdminNewInventoryModal() {

    const { set } = useBusInventoryModal();

    return ReactDOM.createPortal(
        <div className="modal-overlay fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
          <div className="modal bg-[#f9f9f9] p-8 rounded-lg">
            <div className='modal-con w-full'>
                <div className='modal-header w-full flex items-center justify-between mb-8'>
                    <div className='mr-7'>
                        <h3 className=''>Add new Bus</h3>
                    </div>
                    <CloseIcon className='cursor-pointer' width={24} height={24}  onClick={()=>{
                        set({
                            isOpen: false
                        })
                    }} />
                </div>
                <div className="modal-form">
                    <Formik<{
                            plateNumber: string;
                            busName: string;
                        }>
                        initialValues={
                            {
                                plateNumber: "",
                                busName: "",
                            }
                        }
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={({ busName, plateNumber }:{
                            busName: string;
                            plateNumber: string;
                        }) => {
                        const errors: Record<string, string> = {};
                            // validation should happen here
                           
                            return errors;
                        }}
                        onSubmit={async ({ plateNumber, busName}:{
                            busName: string;
                            plateNumber: string;
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
                                name="plateNumber"
                                maxLength={60}
                                placeholder={"Enter Plate Number"}
                                autoFocus
                                autoComplete="off"
                            />
                            </div>
                            <div className={` h-6`}>
                            </div>
                            <div className={`flex bg-primary-700 rounded-8`}>
                            <InputField
                                className={`h-11 w-full`}
                                name="busName"
                                maxLength={60}
                                placeholder={"name"}
                            />
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

export default AdminNewInventoryModal