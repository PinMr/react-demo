import React , { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class CommentApp extends Component {
    constructor () {
        super()
        this.state = {
            comments: []
        }
        console.log('state初始化完成')
    }
    componentWillMount () {
        this.mrLoadComments()
        console.log('组件即将挂载到页面上...')
    }
    componentDidMount () {
        console.log('组件已经挂载到页面上了')
    }
    componentWillUnmount () {
        console.log('组件即将从页面上删除')
    }
    handleSubmitComment (comment) {
        if (!comment) return 
        if (!comment.username) return alert('请输入用户名...')
        if (!comment.content) return alert('请输入评论内容...')
        const comments = this.state.comments
        comments.push(comment)
        this.setState({ comments })
        this.mrSaveComments(comments)
    }
    handleDeleteComment (index) {
        // console.log(index)
        const comments = this.state.comments
        comments.splice(index, 1)
        this.setState({ comments })
        this.mrSaveComments(comments)
    }
    mrLoadComments () {
        let comments = localStorage.getItem('comments')
        // 一开始没有存储localStorage的时候,获取到的是字符串 'undefined'
        if (comments !== 'undefined') {
            comments = JSON.parse(comments)
            this.setState({ comments })
        }
    }
    mrSaveComments (comments) {
        localStorage.setItem('comments', JSON.stringify(comments))
    }
    render() {
        console.log('开始渲染组件...')
        return (
            <div className='wrapper'>
                <CommentInput 
                    onSubmit={this.handleSubmitComment.bind(this)}/> 
                <CommentList 
                    comments={this.state.comments}
                    onDeleteComment={this.handleDeleteComment.bind(this)}/>
            </div>
        )
    }
}

export default CommentApp