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
    <div className="max-w-screen overflow-auto custom-scrollbar">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="mb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h1 className="text-xl font-bold flex items-center space-x-2">
            <span>Évaluation d'agences</span>
            <Star className="h-6 w-6 text-red-500" />
          </h1>
          <div className="my-2">
            <input
              type="text"
              className="border border-gray-400 rounded px-3 py-2 w-full max-w-xs focus:outline-none"
              placeholder="Rechercher une agence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="max-w-screen overflow-auto custom-scrollbar">
          <div className="lg:w-full min-w-[1000px] overflow-x-auto custom-scrollbar">
            <div className="flex space-x-4">
              {Object.entries(columns).map(([status, agences]) => (
                <Droppable droppableId={status} key={status}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`relative border rounded bg-gray-100 p-4 w-1/3
                ${
                  snapshot.isDraggingOver
                    ? "border-4 border-blue-400"
                    : status === "débutante"
                    ? "border-red-500"
                    : status === "intermédiaire"
                    ? "border-yellow-500"
                    : "border-green-500"
                }`}
                    >
                      <h2 className="font-bold capitalize mb-4 text-center">
                        {status}
                      </h2>

                      {agences.map((agence, index) => (
                        <Draggable
                          key={agence.id}
                          draggableId={agence.id.toString()}
                          index={index}
                        >
                          {(provided, snapshotDraggable) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white p-3 mb-3 rounded shadow transition-all duration-200 cursor-grab
                        ${
                          snapshotDraggable.isDragging
                            ? "border-2 border-blue-500"
                            : "border border-transparent"
                        }`}
                            >
                              <div>
                                <h3 className="font-medium flex items-center space-x-2">
                                  <span>{agence.agence}</span>
                                  <BadgeCheck className="h-4 w-4 text-blue-500" />
                                </h3>
                                <div className="flex justify-between mt-2 text-sm">
                                  <div className="flex flex-col space-y-1">
                                    <span>
                                      Numéro ICE:{" "}
                                      <span className="text-gray-500">
                                        {agence.Numéro_ICE}
                                      </span>
                                    </span>
                                    <span>
                                      RC:{" "}
                                      <span className="text-gray-500">
                                        {agence.RC}
                                      </span>
                                    </span>
                                  </div>
                                  <div
                                    className="flex items-end space-x-1 cursor-pointer select-none"
                                    onClick={(e) =>
                                      handlePopoverToggle(e, agence?.id)
                                    }
                                  >
                                    <Handshake className="h-5 w-5" />
                                    <span>courtiers:</span>
                                    <span className="font-semibold">
                                      {agence?.courtier?.length || 0}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Popover */}
                              {showPopover && agence?.id === agencePop && (
                                <div
                                  className="absolute z-50 mt-2 w-64 max-h-64 overflow-auto bg-white border rounded shadow-lg p-4"
                                  style={{
                                    top: `${popoverPosition.top}px`,
                                    left: `${popoverPosition.left}px`,
                                  }}
                                >
                                  <ul className="space-y-3">
                                    {agence?.courtier?.length > 0 ? (
                                      agence.courtier.map((c) => (
                                        <li
                                          key={c.id}
                                          className="flex items-center space-x-3"
                                        >
                                          <img
                                            src={c?.user?.image}
                                            alt="user"
                                            className="h-8 w-8 rounded-full object-cover"
                                          />
                                          <p className="text-sm truncate">
                                            {c?.user?.email}
                                          </p>
                                        </li>
                                      ))
                                    ) : (
                                      <p className="text-sm text-gray-500">
                                        Aucun courtier
                                      </p>
                                    )}
                                  </ul>
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
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default Evaluations;
