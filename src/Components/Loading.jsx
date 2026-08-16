import React from 'react';
import { ColorRing } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#991B1B", "#B91C1C", "#DC2626", "#EF4444", "#FEE2E2"]}
        />
      </div>
    );
};

export default Loading;