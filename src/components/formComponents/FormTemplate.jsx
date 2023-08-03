import React from 'react'
import { useNavigate } from 'react-router-dom'

const FormTemplate = ({ Form, pageDetails }) => {

    const navigate = useNavigate();

    return (
        <div className="relative pt-10 min-h-screen bg-gradient-to-br from-sky-50 to-gray-200">
            <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
                <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
                    <div className="rounded-xl bg-white shadow-xl">
                        <div className="p-6 sm:p-16">
                            <div className="space-y-4">
                                <h2 className="bg-violet-500 text-2xl font-montserrat font-normal px-3 py-1 text-white inline-block rounded-ss-xl rounded-ee-xl">CloudPix</h2>
                                <h2 className="mb-8 text-2xl text-cyan-900 font-bold">{pageDetails.heading}</h2>
                            </div>

                            <Form />

                            <div className="mt-3">
                                <p className="font-montserrat text-xs md:text-sm">
                                    {pageDetails.footer.para} &nbsp;
                                    <span
                                        onClick={() => navigate(pageDetails.footer.link)}
                                        className="text-violet-500 font-semibold cursor-pointer hover:underline">{pageDetails.footer.linkText}
                                    </span>
                                </p>
                            </div>

                            <div className="mt-10 space-y-4 text-gray-600 text-center sm:-mb-8">
                                <p className="text-xs">By proceeding, you agree to our <a href="#" className="underline">Terms of Use</a> and confirm you have read our <a href="#" className="underline">Privacy and Cookie Statement</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormTemplate
