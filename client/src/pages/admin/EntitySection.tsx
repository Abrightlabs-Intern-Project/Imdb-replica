import { useState } from "react";
import axios from "axios";
import { api_url } from "../../context/WatchlistContext";

const EntitySection = ({ entity, entityNameKey, fetchEntities, handleAdd, handleDelete, handleEdit, filterItems, entitySearchTerm, setEntitySearchTerm, additionalFields }: any) => {
  const [newEntityName, setNewEntityName] = useState("");
  const [image, setImage] = useState<FileList | null>(null);
  const [editEntityId, setEditEntityId] = useState(null)
  const [editEntityName, setEditEntityName] = useState("")

  const handleAddEntity = async () => {
    if (entity === "actor" && image) {
      const form = new FormData();
      form.append(`${entityNameKey}`, newEntityName);
      form.append("image", image[0]);
      await axios.post(`${api_url}/${entity}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      await handleAdd(entity, newEntityName);
    }
    fetchEntities();
  };

  const handleEditEntity = async (id: string) => {
    if (entity === "actor" && image) {
      const form = new FormData();
      form.append(`${entityNameKey}`, editEntityName);
      form.append("image", image[0]);
      await axios.patch(`${api_url}/${entity}/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      await handleEdit(entity, id, editEntityName);
    }
    fetchEntities();
  };

  return (
    <div className="p-3 border border-gray-300 rounded">
      <h2 className="text-xl font-semibold mb-3">{entity.charAt(0).toUpperCase() + entity.slice(1)}</h2>
      <input type="text" placeholder={`Search ${entity.charAt(0).toUpperCase() + entity.slice(1)}...`} value={entitySearchTerm} onChange={(e) => setEntitySearchTerm(e.target.value)} className="w-full p-2 border rounded mb-3 outline-none"
      />
      {filterItems(additionalFields, entityNameKey, entitySearchTerm).map((item: any) => (
        <div key={item[`${entity}Id`] } className="flex justify-between items-center py-2 border-b">
          {editEntityId == item[`${entity}Id`] 
          ?
          <div className="flex items-center gap-2 w-full" >
            <input className="border rounded outline-none px-2 py-1 w-full" type="text" value={editEntityName} onChange={(e) => {setEditEntityName(e.target.value)}} onKeyDown={(e) => {
              if(e.key === "Enter") {
                handleEditEntity(item[`${entity}Id`])
                setEditEntityId(null)
              }
            }}/>
            {entity === "actor" && (
              <input className=" px-2 py-1 border rounded outline-none w-32" type="file" onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImage(e.target.files);
                  }
                }}
              />
            )}
            <div className="flex gap-2">
              {/* <button className=" bg-blue-500 text-white px-4 py-1 rounded" onClick={()=>{handleEdit(entity, item[`${entity}Id`], editEntityName); setEditEntityId(null)}}>Save</button> */}
              <button className="bg-[#A9A9A9] text-white px-4 py-1 rounded" onClick={()=>setEditEntityId(null)}>Cancel</button>
            </div>
          </div> 
          :
          <>
            <span className="px-2">{item[entityNameKey]}</span>
            <div>
              <button className="bg-[#1E90FF] text-white px-3 py-1 rounded hover:bg-[#2a76c3] mr-2" onClick={()=> {setEditEntityId(item[`${entity}Id`]); setEditEntityName(item[`${entityNameKey}`])}}>Edit</button>
              <button onClick={() => handleDelete(item[`${entity}Id`], entity)} className="bg-[#1E90FF] text-white px-3 py-1 rounded hover:bg-[#2a76c3]">Delete</button>
            </div>
          </>}
        </div>
      ))}
      <div className="flex my-3 gap-3 ">
        <input type="text" placeholder={`Enter ${entity.charAt(0).toUpperCase() + entity.slice(1)} Name...`} className="w-full px-3 py-1 border outline-none rounded-md" onChange={(e) => setNewEntityName(e.target.value)}/>
        <button className="bg-[#1E90FF] text-white px-5 rounded hover:bg-[#2a76c3]" onClick={handleAddEntity}>ADD</button>
      </div>
      {entity === "actor" && (
        <input className=" px-2 py-1 border rounded outline-none" type="file" onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(e.target.files);
            }
          }}
        />
      )}
    </div>
  );
};

export default EntitySection;
