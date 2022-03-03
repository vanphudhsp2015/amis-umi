import * as React from 'react';
import { Renderer } from 'amis';

interface PropsRender {
  type: string;
}

@Renderer<PropsRender>({
  type: 'my-renderer',
})
class CustomRenderer extends React.Component<PropsRender, any> {
  render() {
    return <div>CustomRenderer</div>;
  }
}

export default CustomRenderer;
