import React, { memo } from "react";
const Alert = memo((props) => {
    const { responseMsg } = props;
    return (
        <>
            {responseMsg.success === true ?
                <div className="alert alert-success">
                    {responseMsg.message}
                </div>
                : (responseMsg.success === false ?
                    <div className="alert alert-danger">
                        {responseMsg.message}
                    </div> : "")}
        </>
    );
});
export { Alert };