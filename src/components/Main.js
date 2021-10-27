import React, { Component } from 'react';
import raw from '../data/data2.json';

import "./main.css";

class Main extends Component {

  hasChildren = (comment) => {
    return comment.replies 
      && comment.replies.data 
      && comment.replies.data.children 
      && comment.replies.data.children.length;
  }

  renderComment = (comment, depth) => {

    // comment has children
    if (this.hasChildren(comment)) {
      const children = comment.replies.data.children.map((c) => {
        return this.renderComment(c.data, depth + 1)
      });

      return (
        <div key={comment.id} className="comment">
          <div>{comment.body}</div>
          <div style={{ paddingLeft: 20 }}>{children}</div>
        </div>
      )      
    } else {
      return (
        <div key={comment.id} className="comment">
          <div>{comment.body}</div>
        </div>
      )
    }
  }

  render() {
    const comments = raw[1].data.children
    return (
      <div>
        { comments.map((comment) => this.renderComment(comment.data, 0)) }
      </div>
    );
  }
}

export default Main;