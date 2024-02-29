import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Layout from "../../components/Layout";
import {useAppSelector} from "../../store";
import {getAllContestResult} from "../../api/api";
import './Dashboard.css';

interface UserResult {
  username: string;
  result: number;
}

interface Item {
  contestTitle: string;
  userResults: UserResult[];
}

const Dashboard = () => {
  const navigate = useNavigate();
  
  const {
    auth: {userDetails},
  } = useAppSelector((state) => state);
  const [exhibition, setExhibition] = useState<Item[]>([]);
  
  useEffect(() => {
    const isLoggedIn = userDetails?.token;
    
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [userDetails, navigate]);
  
  useEffect(() => {
    if (userDetails?.role === 'host')
    {
      getAllContestResult().then((res) => {
        setExhibition(res.data.data)
        // console.log(res.data.data)
      })  
    }
  }, []);
  
  return (
    <Layout>
      {
        userDetails?.role === 'host' && (
          <div className="table-container">
            {exhibition.map((item: Item, index: number) => (
                <table key={index} className="contest-table">
                  <thead>
                  <tr>
                    <th colSpan={2}>{item.contestTitle}</th>
                  </tr>
                  </thead>
                  <tbody>
                  {item.userResults.map((userResult: UserResult, i: number) => (
                    <tr key={i}>
                      <td>{userResult.username}</td>
                      <td>{userResult.result}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              )
            )}
          </div>
        )
      }
    </Layout>
  )
    ;
};

export default Dashboard;