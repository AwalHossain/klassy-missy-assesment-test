// import React from 'react'

// export default function FormStepTwo() {
//   return (
//                           <>
//                             <CharacterImage />
//                             <label className="block text-sm font-medium text-gray-700 mb-1">What's your concern? *</label>
//                             {/* <Select
//                         options={[
//                             { value: '', label: 'Select your concern or search by keyword' },
//                         ]}
//                         value=""
//                         onChange={() => { }}
//                     /> */}
//                             <Select>
//                                 <SelectTrigger className="w-[180px]">
//                                     <SelectValue placeholder="Theme" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="light">Light</SelectItem>
//                                     <SelectItem value="dark">Dark</SelectItem>
//                                     <SelectItem value="system">System</SelectItem>
//                                 </SelectContent>
//                             </Select>

//                             <div className="flex flex-wrap gap-2 mb-4">
//                                 <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
//                                     Hyperpigmentation <button className="ml-1">&times;</button>
//                                 </span>
//                                 <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
//                                     Dehydrated skin <button className="ml-1">&times;</button>
//                                 </span>
//                             </div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Do you have any other concerns?</label>
//                             {/* <Select
//                         options={[
//                             { value: '', label: 'Select eye area concerns' },
//                         ]}
//                         value=""
//                         onChange={() => { }}
//                     /> */}
//                             <Select>
//                                 <SelectTrigger className="w-[180px]">
//                                     <SelectValue placeholder="Theme" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="light">Light</SelectItem>
//                                     <SelectItem value="dark">Dark</SelectItem>
//                                     <SelectItem value="system">System</SelectItem>
//                                 </SelectContent>
//                             </Select>

//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">What's your concern? *</label>
//                                 <textarea
//                                     placeholder="Please write details about your skin concerns and mention A to Z skin problems"
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                                     rows={4}
//                                 ></textarea>
//                             </div>

//                             <div className="flex justify-between">
//                                 <Button variant="secondary" onClick={handleBack}>
//                                     <ChevronLeft className="inline mr-1" /> Back
//                                 </Button>
//                                 <Button type="submit">Submit</Button>
//                             </div>
//                         </>
//   )
// }
