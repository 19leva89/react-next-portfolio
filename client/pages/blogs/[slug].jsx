import axios from 'axios'
import Link from 'next/link'
import Head from 'next/head'
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'

import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { Spinner } from '@/components'
import { formatDate } from '@/utils/format-date'
import { useFetchData } from '@/hooks/use-fetch-data'

import { BsCopy } from 'react-icons/bs'
import { CiRead } from 'react-icons/ci'
import { FaTwitter } from 'react-icons/fa'
import { SlCalender } from 'react-icons/sl'
import { BiLogoLinkedin } from 'react-icons/bi'
import { RiFacebookFill } from 'react-icons/ri'
import { RiWhatsappFill } from 'react-icons/ri'

const BlogPage = () => {
	const router = useRouter()

	const { slug } = router.query
	const { allData } = useFetchData(`/api/blogs`)

	const [error, setError] = useState(null)
	const [copied, setCopied] = useState(false)
	const [loading, setLoading] = useState(true)
	const [messageOk, setMessageOk] = useState('')
	const [blogData, setBlogData] = useState({ blog: {}, comments: [] })
	const [newComment, setNewComment] = useState({
		name: '',
		email: '',
		title: '',
		contentPreview: '',
		mainComment: true,
		parent: null,
		parentName: '',
	})

	// for scroll down to comment form
	const replyFormRef = useRef(null)

	const createdAtDate =
		blogData && blogData.blog.createdAt ? new Date(blogData && blogData.blog.createdAt) : null

	const blogUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${slug}`

	const copyToClipboard = (url) => {
		navigator.clipboard.writeText(url)
		setCopied(true)

		setTimeout(() => {
			setCopied(false)
		}, 3000)
	}

	const CodeBlock = ({ node, inline, className, children, ...props }) => {
		const match = /language-(\w+)/.exec(className || '')

		const [copied, setCopied] = useState(false)

		const handleCopy = () => {
			navigator.clipboard.writeText(children)
			setCopied(true)

			setTimeout(() => {
				setCopied(false)
			}, 3000)
		}

		if (inline) {
			return (
				<code className={className} {...props}>
					{children}
				</code>
			)
		} else if (match) {
			return (
				<div style={{ position: 'relative' }}>
					<SyntaxHighlighter
						style={a11yDark}
						language={match[1]}
						PreTag="pre"
						{...props}
						codeTagProps={{
							style: {
								padding: '0',
								borderRadius: '5px',
								overflow: 'auto',
								whiteSpace: 'pre-wrap',
							},
						}}
					>
						{String(children).replace(/\n$/, '')}
					</SyntaxHighlighter>

					<button
						style={{
							position: 'absolute',
							top: 0,
							right: 0,
							zIndex: '1',
							background: `#3d3d3d`,
							color: '#fff',
							padding: '10px',
						}}
						onClick={() => handleCopy()}
					>
						{copied ? 'Copied!' : 'Copy code'}
					</button>
				</div>
			)
		} else {
			return (
				<code className="md-post-code" {...props}>
					{children}
				</code>
			)
		}
	}

	const handleCommentSubmit = async (e) => {
		e.preventDefault()

		try {
			const res = await axios.post(`/api/blogs/${slug}`, newComment)

			// check for if it`s a reply (nested comment) or a main comment
			if (newComment.parent) {
				// add the new comment to it`s parent`s children array
				setBlogData((prev) => {
					const updatedComments = prev.comments.map((comment) => {
						if (comment._id === newComment.parent) {
							return {
								...comment,
								children: [...comment.children, res.data],
							}
						} else if (comment.children && comment.children.length > 0) {
							// recursively update the children comments
							return {
								...comment,
								children: updateChildrenComments(comment.children, newComment.parent, res.data),
							}
						}

						return comment
					})

					return {
						...prev,
						comments: updatedComments,
					}
				})

				// add new root comment
			} else {
				setBlogData((prev) => ({
					...prev,
					comments: [res.data, ...prev.comments],
				}))
			}

			setMessageOk('✅ Comment posted successfully!')

			setTimeout(() => {
				setMessageOk('')
			}, 5000)

			setNewComment({
				name: '',
				email: '',
				title: '',
				contentPreview: '',
				mainComment: true,
				parent: null,
				parentName: '',
			})
		} catch (error) {
			setMessageOk('❌ Failed to post comment, please try again later.')

			setTimeout(() => {
				setMessageOk('')
			}, 5000)

			setError(error.response.data.message)
		}
	}

	const handleReply = (parentCommentId, parentName) => {
		setNewComment({
			...newComment,
			parent: parentCommentId,
			parentName: parentName,
			mainComment: false,
		})

		if (replyFormRef.current) {
			replyFormRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}

	const handleRemoveReply = () => {
		setNewComment({
			...newComment,
			parent: null,
			parentName: null,
			mainComment: true,
		})
	}

	const updateChildrenComments = (comments, parentId, newComment) => {
		return comments.map((comment) => {
			if (comment._id === parentId) {
				// add new reply to children array
				return {
					...comment,
					children: [...comment.children, newComment],
				}
			} else if (comment.children && comment.children.length > 0) {
				// recursively update the children comments
				return {
					...comment,
					children: updateChildrenComments(comment.children, parentId, newComment),
				}
			}

			return comment
		})
	}

	const renderComments = (comments) => {
		if (!comments) {
			return null
		}

		// create a map to efficiently find children of each comment
		const commentsMap = new Map()
		comments.forEach((comment) => {
			if (comment.mainComment) {
				commentsMap.set(comment._id, [])
			}
		})

		// populate children comments into their respective parents
		comments.forEach((comment) => {
			if (!comment.mainComment && comment.parent) {
				if (commentsMap.has(comment.parent)) {
					commentsMap.get(comment.parent).push(comment)
				}
			}
		})

		// render the comments
		return comments
			.filter((comment) => comment.mainComment)
			.map((parentComment) => (
				<div key={parentComment._id} className="blog-comment">
					<h3>
						{parentComment.name} <span>{new Date(parentComment.createdAt).toLocaleString()}</span>
					</h3>

					<h4>
						Topic: <span>{parentComment.title}</span>
					</h4>

					<p>{parentComment.contentPreview}</p>

					<button onClick={() => handleReply(parentComment._id, parentComment.name)}>Reply</button>

					{parentComment.parent && <span className="replied-to">Replied to {parentComment.parentName}</span>}

					<div className="children-comments">
						{commentsMap.get(parentComment._id).map((childComment) => (
							<div key={childComment._id} className="child-comment">
								<h3>
									{childComment.name} <span>{new Date(childComment.createdAt).toLocaleString()}</span>
								</h3>

								<span>Replied to {childComment.parentName}</span>

								<h4>
									Topic: <span>{childComment.title}</span>
								</h4>

								<p>{childComment.contentPreview}</p>
							</div>
						))}
					</div>
				</div>
			))
	}

	useEffect(() => {
		const fetchBlogData = async () => {
			if (slug) {
				try {
					const res = await axios.get(`/api/blogs/${slug}`)

					setBlogData(res.data)
					setLoading(false)
				} catch (error) {
					setError('Failed to fetch blog data, please try again later.')
					setLoading(false)
				}
			}
		}

		fetchBlogData()
	}, [slug])

	if (loading) {
		return (
			<div className="flex flex-center wh_100">
				<Spinner />
			</div>
		)
	}

	if (error) {
		return <p>Error: {error}</p>
	}

	return (
		<>
			<Head>
				<title>{slug ? slug.replace('-', ' ') : 'Loading...'}</title>
			</Head>

			{blogData && (
				<div className="blog-slug-page">
					<div className="container">
						<div className="blog-slug-page-cont">
							<div className="left-side-details">
								<div className="left-blog-info-img">
									<img src={blogData.blog.images[0] || '/img/no-image.png'} alt={blogData.blog.title} />
								</div>

								<div className="slug-blog-info-pub">
									<div className="flex gap-2">
										<div className="admin-slug">
											<img src="/img/coder-white.png" alt="coder" />
											<span>by Sobolev</span>
										</div>

										<div className="admin-slug">
											<SlCalender />
											<span>{formatDate(createdAtDate)}</span>
										</div>

										<div className="admin-slug">
											<CiRead />
											<span>Comments ({blogData.comments ? blogData.comments.length : 0})</span>
										</div>
									</div>

									<div className="share-blog-slug">
										{/* copy url button */}
										<div
											title="Copy URL"
											onClick={() => copyToClipboard(blogUrl)}
											style={{ cursor: 'pointer' }}
										>
											<BsCopy />
											<span>{copied ? 'Copied!' : ''}</span>
										</div>

										{/* facebook share button */}
										<Link
											href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<RiFacebookFill />
										</Link>

										{/* twitter share button */}
										<Link
											href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this blog post: ${blogData.blog.title}`)}&url=${encodeURIComponent(blogUrl)}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<FaTwitter />
										</Link>

										{/* whatsapp share button */}
										<Link
											href={`https://wa.me/?text=Check out this blog post: ${encodeURIComponent(blogUrl)}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<RiWhatsappFill />
										</Link>

										{/* linkedin share button */}
										<Link
											href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<BiLogoLinkedin />
										</Link>
									</div>
								</div>

								<h1>{blogData.blog.title}</h1>

								{loading ? (
									<Spinner />
								) : (
									<div className="blog-content">
										<ReactMarkdown remarkPlugins={[remarkGfm]} components={{ code: CodeBlock }}>
											{blogData.blog.description}
										</ReactMarkdown>
									</div>
								)}

								<div className="blog-slug-tags">
									<div className="blog-s-tags">
										<h2>Tags:</h2>

										<div className="flex flex-wrap gap-1">
											{blogData.blog.tags.map((tag) => (
												<span key={tag}>{tag}</span>
											))}
										</div>
									</div>
								</div>

								<div className="blog-use-comments">
									<h2>Comments:</h2>
									{renderComments(blogData.comments)}
								</div>

								<div className="blog-slug-comments" ref={replyFormRef}>
									{}

									{}

									<p>Your email will not be published. Required fields are marked *</p>
									<form onSubmit={handleCommentSubmit} className="leave-areply-form">
										<div className="name-email-comment">
											<input
												type="text"
												placeholder="Enter Name"
												value={newComment.name}
												onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
											/>

											<input
												type="email"
												placeholder="Enter Email"
												value={newComment.email}
												onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
											/>
										</div>

										<input
											type="text"
											placeholder="Enter Title"
											value={newComment.title}
											onChange={(e) => setNewComment({ ...newComment, title: e.target.value })}
										/>

										<textarea
											name=""
											rows={4}
											id="text-comments"
											placeholder="Enter your Comment"
											value={newComment.contentPreview}
											onChange={(e) => setNewComment({ ...newComment, contentPreview: e.target.value })}
										></textarea>

										<div className="flex gap-2">
											<button type="submit">Post Comment</button>

											<p>{messageOk}</p>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default BlogPage
