import React, { Component } from 'react';
import raw from '../data/data.json';

import "./main.css";

class Main extends Component {

  hasChildren = (comment) => {
    /**
     * Sure there's a better way to do this which is to use lodash get
     */
    return comment.replies 
      && comment.replies.data 
      && comment.replies.data.children 
      && comment.replies.data.children.length;
  }

  hasNoChildren = (comment) => !this.hasChildren(comment)

  renderComment = (comment) => {
    /**
     * If comment has no children
     */
    if (this.hasNoChildren(comment)) {
      return (
        <div key={comment.id} className="comment">
          <div>{comment.body}</div>
        </div>
      )
    }

    /**
     * Comment has children
     */
    const children = comment.replies.data.children.map((c) => {
      return this.renderComment(c.data)
    });
    
    return (
      <div key={comment.id} className="comment">
        <div>{comment.body}</div>
        <div className="children-list">{children}</div>
      </div>
    )
  }

  render() {
    const comments = raw[1].data.children
    return (
      <div>
        { comments.map((comment) => this.renderComment(comment.data)) }
      </div>
    );
  }
}

export default Main;