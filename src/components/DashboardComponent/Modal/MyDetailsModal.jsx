import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import NameChangeForm from '../ImageDetails/NameChangeForm';
import toast from 'react-hot-toast';
import DeleteImage from '../ImageDetails/DeleteImage';
import { Download, Pencil, Share, Trash } from '../../../assets/SVGs';

const MyDetailsModal = ({ isOpen, setIsOpen, image }) => {

    function closeModal() {
        setIsOpen(false);
    }

    // Reform image size to MB or KB
    const getSize = (bytes) => {
        const mb = (bytes / (1024 * 1024)).toFixed(2);
        if (Math.floor(mb) === 0) {
            return (bytes / 1024).toFixed(2) + "Kb"
        } else {
            return mb + "Mb"
        }
    }

    const copyUrl = (url) => {
        toast.success("Copied to clipboad")
        navigator.clipboard.writeText(url);
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="div"
                                    >
                                        <p className="my-1 text-sm leading-relaxed font-montserrat">
                                            Filename: &nbsp;
                                            <span className='font-bold'>{image?.filename}</span>
                                        </p>
                                        <p className="my-1 text-sm leading-relaxed font-montserrat">
                                            Size: &nbsp;
                                            <span className='font-bold'>{getSize(image?.size)}</span>
                                        </p>
                                        <p className="my-1 text-sm leading-relaxed font-montserrat">
                                            Date: &nbsp;
                                            <span className='font-bold'>{image ? new Date(image.date).toISOString().slice(0, 10) : ''}</span>
                                        </p>
                                    </Dialog.Title>
                                    <div className="mt-2 border-t-2">
                                        <a href={image?.url} className='outline-none' download rel="noopener noreferrer" target="_blank">
                                            <div className='py-2 flex items-center hover:bg-slate-100 cursor-pointer'>
                                                <p className="my-1 text-sm leading-relaxed font-montserrat flex items-center gap-2">
                                                    <Download />
                                                    <span className='font-bold'>Download</span>
                                                </p>
                                            </div>
                                        </a>
                                        <Disclosure>
                                            <Disclosure.Button className="py-2 flex items-center hover:bg-slate-100 cursor-pointer w-full">
                                                <p className="my-1 text-sm leading-relaxed font-montserrat flex items-center gap-2">
                                                    <Pencil />
                                                    <span className='font-bold'>Rename</span>
                                                </p>
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="bg-gray-200">
                                                <NameChangeForm filename={image?.filename} imageId={image?._id} setIsOpen={setIsOpen} />
                                            </Disclosure.Panel>
                                        </Disclosure>
                                        <div className='py-2 flex items-center hover:bg-slate-100 cursor-pointer' onClick={() => copyUrl(image?.url)}>
                                            <p className="my-1 text-sm leading-relaxed font-montserrat flex items-center gap-2">
                                                <Share />
                                                <span className='font-bold'>Share</span>
                                            </p>
                                        </div>
                                        <Disclosure>
                                            <Disclosure.Button className="py-2 flex items-center hover:bg-slate-100 cursor-pointer w-full">
                                                <p className="my-1 text-sm leading-relaxed font-montserrat flex items-center gap-2">
                                                    <Trash />
                                                    <span className='font-bold'>Delete</span>
                                                </p>
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="bg-gray-200">
                                                <DeleteImage imageId={image?._id} setIsOpen={setIsOpen} />
                                            </Disclosure.Panel>
                                        </Disclosure>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default MyDetailsModal;
