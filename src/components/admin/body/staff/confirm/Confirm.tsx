import { FC, ReactElement, useEffect, useState } from "react";
import * as IconBs from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { retrivePersonnes } from "../../../../../slices/personneSlice";
import "./Confirm.scss";
import Ipersonne1 from "../../../../../types/personne/personne1";
import { AppDispatch } from "../../../../../store";
import RouteProgress from "../../../../../shared/routeProgress/RouteProgress";
import Istate from "../../../../../types/state/state";

const Confirm: FC = (): ReactElement => {
  const [searchUsername, setSearchUsername] = useState<string>("");
  const personnes: Ipersonne1[] = useSelector(
    (state: Istate) => state.personnes.personnes
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(retrivePersonnes(""));
  }, [dispatch]);

  const onChangeSearchUsername = (e: any) => {
    setSearchUsername(e.target.value);
  };

  return (
    <div className="bg px-2">
      <h4 className="pt-2">
        <IconBs.BsFillPersonCheckFill className="me-2" />
        Confirm person
      </h4>

      <RouteProgress />

      <div className="content">
        <div className="d-flex ms-auto mb-2">
          <select
            className="form-select form-select-sm ms-auto"
            aria-label=".form-select-sm example"
            defaultValue=""
          >
            <option value="" disabled hidden>
              Role
            </option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

          <div className="input-group input-group-sm ms-2">
            <input
              type="text"
              className="form-control h-100"
              placeholder="Username"
              value={searchUsername}
              onChange={onChangeSearchUsername}
            />
            <button
              className="input-group-text btn btn-primary h-100"
              type="button"
              onClick={() => dispatch(retrivePersonnes(searchUsername))}
            >
              <IconBs.BsSearch className="w-100 h-100" />
            </button>
          </div>
        </div>

        <table className="table table-bordered table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nom</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {personnes?.map((personne: Ipersonne1, index: number) => {
              return (
                <tr key={index}>
                  <th scope="row">{personne.id}</th>
                  <td>{personne.username}</td>
                  <td>{personne.email}</td>
                  <td>{personne.role?.role}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Confirm;
