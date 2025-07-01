import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BadgeCheck, Handshake, Star } from "lucide-react";
import { toast } from "sonner";

function Evaluations() {
  const agences = useSelector((state) => state.AgencesReducer);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [columns, setColumns] = useState({
    débutante: [],
    intermédiaire: [],
    professionnelle: [],
  });

  useEffect(() => {
    const filtered = {
      débutante: agences.filter(
        (a) =>
          a.evaluation_id === 1 &&
          a.agence.toLowerCase().includes(searchTerm.toLowerCase())
      ),
      intermédiaire: agences.filter(
        (a) =>
          a.evaluation_id === 2 &&
          a.agence.toLowerCase().includes(searchTerm.toLowerCase())
      ),
      professionnelle: agences.filter(
        (a) =>
          a.evaluation_id === 3 &&
          a.agence.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    };
    setColumns(filtered);
  }, [searchTerm, agences]);

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = [...columns[source.droppableId]];
    const [movedAgency] = sourceCol.splice(source.index, 1);

    const destCol = [...columns[destination.droppableId]];

    if (source.droppableId === destination.droppableId) {
      sourceCol.splice(destination.index, 0, movedAgency);
      setColumns((prev) => ({
        ...prev,
        [source.droppableId]: sourceCol,
      }));
    } else {
      const loading = toast.loading(
        "Changement d'évaluation de : " + movedAgency.agence
      );
      destCol.splice(destination.index, 0, movedAgency);
      setColumns((prev) => ({
        ...prev,
        [source.droppableId]: sourceCol,
        [destination.droppableId]: destCol,
      }));

      try {
        const evaluationRes = await axios.post(
          `/api/agences/${movedAgency.id}/evaluation`,
          { evaluation: String(destination.droppableId) }
        );
        if (evaluationRes.status >= 200 && evaluationRes.status <= 300) {
          toast.success(
            "L'évaluation de cette agence a été modifiée avec succès"
          );
          dispatch({
            type: "GET_AGENCES",
            payload: evaluationRes.data.agences,
          });
        }
      } catch (err) {
        console.error("Failed to update evaluation", err);
      } finally {
        toast.dismiss(loading);
      }
    }
  };

  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [agencePop, setAgencePop] = useState(null);

  const handlePopoverToggle = (event, id) => {
    setAgencePop(id);
    setShowPopover(!showPopover);
    const { top, left, width } = event.target.getBoundingClientRect();
    setPopoverPosition({ top: top + 30, left: left + width / 2 });
  };

  useEffect(() => {
    const hidePopover = () => {
      if (showPopover === true) {
        setShowPopover(false);
      }
    };
    document.body.addEventListener("click", hidePopover);
    return () => document.body.removeEventListener("click", hidePopover);
  }, [showPopover]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className=" mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold flex items-center space-x-2">
          <span>Évaluation d'agences</span>
          <Star/>
        </h1>
        <div className="my-2">
          <input
            type="text"
            className="border border-gray-400 rounded px-2 py-1.5 w-80 focus:outline-none"
            placeholder="Rechercher une agence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex space-x-4 w-full">
        {Object.entries(columns).map(([status, agences]) => (
          <Droppable droppableId={status} key={status}>
            {(provided, snapshot) => (
              <div
                className={`relative border bg-gray-100 p-4 w-1/3 rounded ${
                  snapshot.isDragging && "border-2"
                } ${
                  status === "débutante"
                    ? " border-red-500"
                    : status === "intermédiaire"
                    ? " border-yellow-500"
                    : "border-green-500"
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="font-bold capitalize mb-2">{status}</h2>
                {agences.map((agence, index) => (
                  <Draggable
                    key={agence.id}
                    draggableId={agence.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className={`bg-white p-2 mb-2 rounded shadow relative transition-all duration-200 ${
                          snapshot.isDragging ? "border-2 border-blue-500" : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div>
                          <h2 className="font-medium flex space-x-2 items-center">
                            <span>{agence.agence}</span>
                            <BadgeCheck className="h-4 w-4 text-blue-500" />
                          </h2>
                          <div className="flex justify-between">
                            <div className="flex  flex-col text-sm">
                              <span>
                                Numéro ICE :{" "}
                                <span className="text-gray-500 ">
                                  {agence.Numéro_ICE}
                                </span>
                              </span>
                              <span>
                                RC :{" "}
                                <span className="text-gray-500 ">
                                  {agence.RC}
                                </span>
                              </span>
                            </div>
                            <div
                              className="flex space-x-1 items-end cursor-pointer"
                              onClick={(e) =>
                                handlePopoverToggle(e, agence?.id)
                              }
                            >
                              <Handshake className="h-4" />
                              <span>courtiers : </span>
                              <span>{agence?.courtier?.length}</span>
                            </div>
                          </div>
                        </div>
                        {showPopover && agence?.id === agencePop && (
                          <div
                            className="absolute bg-white border p-4 rounded shadow-md z-50"
                            style={{
                              top: `${popoverPosition.top}px`,
                              left: `${popoverPosition.left}px`,
                            }}
                          >
                            <div>
                              <ul>
                                {agence?.courtier?.length > 0 &&
                                  agence?.courtier?.map((c) => (
                                    <div
                                      key={c.id}
                                      className="flex items-center space-x-2"
                                    >
                                      <img
                                        src={c?.user?.image}
                                        alt="image"
                                        className="h-8 w-8 rounded-full"
                                      />
                                      <p>{c?.user?.email}</p>
                                    </div>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

export default Evaluations;
