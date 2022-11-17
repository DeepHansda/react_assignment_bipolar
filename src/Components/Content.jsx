import {
  EditOutlined,
  HeartOutlined,
  DeleteOutlined,
  MailOutlined,
  GlobalOutlined,
  PhoneOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Card, Form, Input, Modal } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useContext, useReducer, useState } from "react";
import { ProjectContext } from "../App";
import "./content.css";

function Content({ user }) {
  const [fillHeart, setFillHeart] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { profiles, setProfiles } = useContext(ProjectContext);

  const initialStates = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    website: user.website,
  };

  //form reducer-----------------------------------
  const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case "name":
        return {
          ...state,
          name: payload,
        };
      case "email":
        return {
          ...state,
          email: payload,
        };
      case "phone":
        return {
          ...state,
          phone: payload,
        };
      case "website":
        return {
          ...state,
          website: payload,
        };
      default:
        return state;
    }
  };

  const [profile, dispatch] = useReducer(reducer, initialStates);

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [website, setWebsite] = useState(profile.website);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch({
      type: "name",
      payload: name,
    });

    dispatch({
      type: "email",
      payload: email,
    });

    dispatch({
      type: "phone",
      payload: phone,
    });

    dispatch({
      type: "website",
      payload: website,
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setProfiles(profiles && profiles.filter((i) => i.id !== id));
  };

  return (
    <>
      {/* --Modal-- */}

      <div>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              value={profile.name}
              rules={[{ required: true, message: "Please enter name!" }]}
            >
              <Input
                defaultValue={profile.name}
                value={profile.name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter email address !" },
              ]}
            >
              <Input
                defaultValue={profile.email}
                value={profile.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please Enter phone number!" },
              ]}
            >
              <Input
                defaultValue={profile.phone}
                value={profile.phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Website"
              name="website"
              rules={[{ required: true, message: "Please enter website!" }]}
            >
              <Input
                defaultValue={profile.website}
                value={profile.website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>

      {/* --Card-- */}
      <Card
        cover={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f5f5f5",
            }}
          >
            <img
              src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
              alt={user.name}
              style={{ width: "200px", height: "200px" }}
            />
          </div>
        }
        actions={[
          <>
            {fillHeart ? (
              <HeartOutlined
                style={{ color: "red", fontSize: "20px" }}
                onClick={() => setFillHeart(!fillHeart)}
              />
            ) : (
              <HeartFilled
                style={{ color: "red", fontSize: "20px" }}
                onClick={() => setFillHeart(!fillHeart)}
              />
            )}
          </>,
          <EditOutlined
            key="edit"
            style={{ fontSize: "18px" }}
            onClick={() => showModal()}
          />,
          <DeleteOutlined
            style={{ fontSize: "18px" }}
            onClick={() => handleDelete(profile.id)}
          />,
        ]}
      >
        <Meta
          title={profile.name}
          description={
            <>
              <div className="content">
                <MailOutlined />
                <p>{profile.email}</p>
              </div>

              <div className="content">
                <PhoneOutlined />
                <p>{profile.phone}</p>
              </div>

              <div className="content">
                <GlobalOutlined />
                <p>{profile.website}</p>
              </div>
            </>
          }
        />
      </Card>
    </>
  );
}

export default Content;
