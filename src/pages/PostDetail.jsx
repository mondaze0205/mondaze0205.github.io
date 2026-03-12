import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

function PostDetail() {
  const { id } = useParams()
  const [content, setContent] = useState('')

  useEffect(() => {
    // 마크다운 파일을 가져옵니다. 
    // Vite 빌드 시 src/posts/*.md 파일들이 public 경로로 복사되거나 
    // 동적으로 로드될 수 있도록 설정해야 합니다. 
    // 현재는 테스트를 위해 직접 fetch를 사용해 볼게요.
    import(`../posts/${id}.md?raw`)
      .then(res => setContent(res.default))
      .catch(err => setContent('# 포스트를 찾을 수 없습니다.\n파일 경로를 확인해 주세요.'))
  }, [id])

  return (
    <div className="post-detail-container">
      <Link to="/">← 목록으로 돌아가기</Link>
      <article className="markdown-body">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </div>
  )
}

export default PostDetail
