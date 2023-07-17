import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                value={filter.search}
                onChange={e => setFilter({...filter, search: e.target.value})}
                placeholder="...Поиск"/>

            <MySelect
                value={filter.sort}
                onChange={e => setFilter({...filter, sort: e.target.value})}
                options={[
                    {value: "title", name: "По названию"},
                    {value: "body", name: "По описанию"}]}
            />

        </div>
    );
};

export default PostFilter;