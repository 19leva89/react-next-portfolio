import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import MarkdownEditor from 'react-markdown-editor-lite'

import 'react-markdown-editor-lite/lib/index.css'

import { Spinner } from '@/components'

export const Blog = () => {
	const router = useRouter()
	const [redirect, setRedirect] = useState(false)

	const [title, setTitle] = useState('')
	const [slug, setSlug] = useState('')
	const [images, setImages] = useState([])
	const [description, setDescription] = useState('')
	const [blogCategory, setBlogCategory] = useState([])
	const [tags, setTags] = useState([])
	const [status, setStatus] = useState('')

	// for images uploading
	const [isUploading, setIsUploading] = useState(false)
	const uploadImagesQuery = []

	const createBlog = async (e) => {
		e.preventDefault()

		const data = { title, slug, images, description, blogCategory, tags, status }

		if (_id) {
			await axios.put(`/api/blogs`, { ...data, _id })
			toast.success('Blog updated successfully')
		} else {
			await axios.post(`/api/blogs`, data)
			toast.success('Blog created successfully')
		}

		setRedirect(true)
	}

	// for slug url
	const handleSlugChange = (e) => {
		const inputValue = e.target.value
		const newSlug = inputValue.replace(/\s+/g, '-')

		setSlug(newSlug)
	}

	return (
		<form className="add-website-form" onSubmit={createBlog}>
			{/* blog title */}
			<div className="w-100 flex flex-col flex-left mb-2">
				<label htmlFor="title">Title</label>
				<input
					type="text"
					id="title"
					placeholder="Enter small title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>

			{/* blog slug url */}
			<div className="w-100 flex flex-col flex-left mb-2">
				<label htmlFor="slug">Slug (seo friendly url)</label>
				<input type="text" id="slug" placeholder="Enter slug url" value={slug} onChange={handleSlugChange} />
			</div>

			{/* blog category */}
			<div className="w-100 flex flex-col flex-left mb-2">
				<label htmlFor="category">Select category (for multiple press Ctrl + mouse left key)</label>
				<select
					name="category"
					id="category"
					value={blogCategory}
					onChange={(e) => setBlogCategory(Array.from(e.target.selectedOptions, (option) => option.value))}
					multiple
				>
					<option value="nodejs">Node JS</option>
					<option value="reactjs">React JS</option>
					<option value="nextjs">Next JS</option>
					<option value="css">CSS</option>
					<option value="digital-marketing">Digital Marketing</option>
					<option value="flutter-dev">Flutter Dev</option>
					<option value="database">Database</option>
					<option value="deployment">Deployment</option>
				</select>
			</div>

			{/* blog images */}
			<div className="w-100 flex flex-col flex-left mb-2">
				<div className="w-100">
					<label htmlFor="images">Images (first image will be shown as thumbnail, you can drag)</label>
					<input type="file" id="fileInput" className="mt-1" accept="image/*" multiple />
				</div>

				<div className="w-100 flex flex-left mt-1">
					<Spinner />
				</div>
			</div>

			{/* image preview and image sortable */}
			{/* pending */}

			{/* markdown description */}
			<div className="description w-100 flex flex-col flex-left mb-2">
				<label htmlFor="description">
					Blog content (for image: first upload and copy link and paste in ![alt text](link))
				</label>

				<MarkdownEditor
					style={{ width: '100%', height: '400px' }}
					renderHTML={(text) => (
						<ReactMarkdown
							components={{
								code: ({ node, inline, className, children, ...props }) => {
									// for code block
									const match = /language-(\w+)/.exec(className || '')

									if (inline) {
										return <code>{children}</code>
									} else if (match) {
										return (
											<div style={{ position: 'relative' }}>
												<pre
													style={{
														padding: '0',
														borderRadius: '5px',
														overflow: 'auto',
														whiteSpace: 'pre-wrap',
													}}
													{...props}
												>
													<code>{children}</code>
												</pre>

												<button
													style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }}
													onClick={() => navigator.clipboard.writeText(children)}
												>
													copy code
												</button>
											</div>
										)
									} else {
										return <code {...props}>{children}</code>
									}
								},
							}}
						>
							{text}
						</ReactMarkdown>
					)}
				/>
			</div>

			{/* tags */}
			<div className="w-100 flex flex-col flex-left mb-2">
				<label htmlFor="tags">Tags</label>
				<select name="tags" id="tags" multiple>
					<option value="html">HTML</option>
					<option value="css">CSS</option>
					<option value="javascript">Java Script</option>
					<option value="nextjs">Next JS</option>
					<option value="reactjs">React JS</option>
					<option value="database">Database</option>
				</select>
			</div>

			{/* blog status */}
			<div className="w-100 flex flex-col flex-left mb-2">
				<label htmlFor="status">Status</label>
				<select name="status" id="status">
					<option value="">No select</option>
					<option value="draft">Draft</option>
					<option value="publish">Publish</option>
				</select>
			</div>

			<div className="w-100 mb-1">
				<button className="w-100 flex-center" type="submit">
					SAVE BLOG
				</button>
			</div>
		</form>
	)
}
