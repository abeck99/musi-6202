import React, { Component } from 'react';

import Section from './Section';
import marked from 'marked';

export default class MarkdownSection extends Section {
  render() {
    const { markdown } = this.props;
    
    return (
      <Section>
        {marked(markdown)}
      </Section>
    )
  }
}
