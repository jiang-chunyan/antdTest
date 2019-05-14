let editState = ''
let editStateStr = 'transcoding'
if (editStateStr === 'transcode') {
    editState = '0'
} else if (editStateStr === 'transcoding') {
    editState = '1'
} else if (editStateStr === 'transcoded') {
    editState = '2'
} 

const editStateData = [
    {
        editState: editState,
    }
]

const getFakeEditData = {
    editStateData,
};

export default {
    'GET /api/fake_edit_data': getFakeEditData,
};