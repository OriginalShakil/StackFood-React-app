import { useQuery } from 'react-query'
import MainApi from '../../../api/MainApi'

const getArticleById = async (articleId) => {
    const { data } = await MainApi.get(`/api/v1/posts/${articleId}`)
    return data
}

export default function useArticle(articleId) {
    return useQuery(['article', articleId], () => getArticleById(articleId))
}
